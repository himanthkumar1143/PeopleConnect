import { useState, useEffect } from 'react';
import { useToast } from '../../context/ToastContext';
import AdminLayout from '../../components/layout/AdminLayout';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import { SkeletonRow } from '../../components/ui/SkeletonCard';
import { formatDateShort } from '../../utils/formatDate';

import { fetchJobs, createJob, updateJob, deleteJob } from '../../api/job.api';
import { fetchTips, createTip, updateTip, deleteTip } from '../../api/agriculture.api';
import { fetchHealthInfo, createHealthInfo, updateHealthInfo, deleteHealthInfo } from '../../api/healthcare.api';
import { fetchResources, createResource, updateResource, deleteResource } from '../../api/education.api';

const tabs = ['Jobs', 'Agriculture', 'Healthcare', 'Education'];

// Field configs per module
const fieldConfigs = {
  Jobs: [
    { name: 'title', label: 'Job Title', required: true },
    { name: 'company', label: 'Company', required: true },
    { name: 'location', label: 'Location', required: true },
    { name: 'type', label: 'Job Type (e.g. Full-time)' },
    { name: 'salary', label: 'Salary Range' },
    { name: 'description', label: 'Description', multiline: true, required: true },
  ],
  Agriculture: [
    { name: 'title', label: 'Title', required: true },
    { name: 'description', label: 'Description', multiline: true, required: true },
    { name: 'category', label: 'Category', type: 'select', options: ['tip', 'scheme'] },
  ],
  Healthcare: [
    { name: 'title', label: 'Title', required: true },
    { name: 'services', label: 'Services Available', required: true },
    { name: 'description', label: 'Description', multiline: true },
  ],
  Education: [
    { name: 'title', label: 'Title', required: true },
    { name: 'courseName', label: 'Course Name', required: true },
    { name: 'resourceLink', label: 'Resource Link (URL)' },
    { name: 'description', label: 'Description', multiline: true },
  ],
};

const apiMap = {
  Jobs: { list: fetchJobs, create: createJob, update: updateJob, delete: deleteJob, key: 'jobs' },
  Agriculture: { list: fetchTips, create: createTip, update: updateTip, delete: deleteTip, key: 'tips' },
  Healthcare: { list: fetchHealthInfo, create: createHealthInfo, update: updateHealthInfo, delete: deleteHealthInfo, key: 'info' },
  Education: { list: fetchResources, create: createResource, update: updateResource, delete: deleteResource, key: 'resources' },
};

const getTableCols = (tab) => {
  if (tab === 'Jobs') return ['Title', 'Company', 'Location', 'Type'];
  if (tab === 'Agriculture') return ['Title', 'Category', 'Description'];
  if (tab === 'Healthcare') return ['Title', 'Services'];
  return ['Title', 'Course Name', 'Link'];
};

const getRowValues = (tab, item) => {
  if (tab === 'Jobs') return [item.title, item.company, item.location, item.type || 'Full-time'];
  if (tab === 'Agriculture') return [item.title, <Badge key="cat" status={item.category} />, item.description?.slice(0, 60) + '...'];
  if (tab === 'Healthcare') return [item.title, item.services?.slice(0, 60)];
  return [item.title, item.courseName, item.resourceLink ? (
    <a href={item.resourceLink} target="_blank" rel="noopener noreferrer" className="text-[#3B6D11] hover:underline">Link</a>
  ) : '—'];
};

const ModuleManagerPage = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('Jobs');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const api = apiMap[activeTab];
  const fields = fieldConfigs[activeTab];

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.list();
      setItems(data[api.key] || []);
    } catch {
      showToast(`Failed to load ${activeTab}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [activeTab]);

  const openAdd = () => {
    setEditItem(null);
    const defaults = {};
    fields.forEach((f) => { defaults[f.name] = f.options ? f.options[0] : ''; });
    setFormData(defaults);
    setFormErrors({});
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    const vals = {};
    fields.forEach((f) => { vals[f.name] = item[f.name] || ''; });
    setFormData(vals);
    setFormErrors({});
    setModalOpen(true);
  };

  const validate = () => {
    const errs = {};
    fields.filter((f) => f.required).forEach((f) => {
      if (!formData[f.name]?.trim()) errs[f.name] = `${f.label} is required`;
    });
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setFormErrors(errs);
    setSubmitting(true);
    try {
      if (editItem) {
        await api.update(editItem._id, formData);
        showToast(`${activeTab.slice(0, -1)} updated!`, 'success');
      } else {
        await api.create(formData);
        showToast(`${activeTab.slice(0, -1)} added!`, 'success');
      }
      setModalOpen(false);
      load();
    } catch (err) {
      showToast(err.response?.data?.message || 'Operation failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    setDeleting(true);
    try {
      await api.delete(confirmDelete);
      showToast('Deleted successfully', 'success');
      setConfirmDelete(null);
      load();
    } catch (err) {
      showToast(err.response?.data?.message || 'Delete failed', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const cols = getTableCols(activeTab);

  return (
    <AdminLayout pageTitle="Module Manager">
      {/* Tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            id={`module-tab-${tab.toLowerCase()}`}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-[13px] font-medium border transition-all
              ${activeTab === tab
                ? 'bg-[#3B6D11] text-white border-[#3B6D11]'
                : 'bg-white text-[#5F5E5A] border-[#d4d0c8] hover:border-[#3B6D11]/30'
              }`}
          >
            {tab}
          </button>
        ))}
        <Button
          id="add-new-btn"
          size="sm"
          onClick={openAdd}
          className="ml-auto"
        >
          + Add New
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-[#3B6D11]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#F1EFE8]">
                {cols.map((c) => (
                  <th key={c} className="text-left px-5 py-3 font-medium text-[#5F5E5A]">{c}</th>
                ))}
                <th className="text-left px-4 py-3 font-medium text-[#5F5E5A]">Added</th>
                <th className="text-left px-4 py-3 font-medium text-[#5F5E5A]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAF3DE]">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={cols.length + 2} className="px-5 py-10 text-center text-[#5F5E5A]">
                    No items yet. Click "Add New" to get started.
                  </td>
                </tr>
              ) : items.map((item) => {
                const vals = getRowValues(activeTab, item);
                return (
                  <tr key={item._id} className="hover:bg-[#F1EFE8]/50 transition-colors">
                    {vals.map((v, i) => (
                      <td key={i} className="px-5 py-3 text-[#2C2C2A] max-w-[160px]">
                        <div className="truncate">{v}</div>
                      </td>
                    ))}
                    <td className="px-4 py-3 text-[#5F5E5A] whitespace-nowrap">{formatDateShort(item.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" onClick={() => openEdit(item)}>Edit</Button>
                        <Button size="sm" variant="danger" onClick={() => setConfirmDelete(item._id)}>Del</Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? `Edit ${activeTab.slice(0, -1)}` : `Add ${activeTab.slice(0, -1)}`}
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map((field) => (
            field.type === 'select' ? (
              <div key={field.name} className="flex flex-col gap-1">
                <label className="text-[13px] font-medium text-[#2C2C2A]">{field.label}</label>
                <select
                  value={formData[field.name] || ''}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  className="px-3 py-2.5 text-[14px] bg-white border border-[#d4d0c8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B6D11]/30"
                >
                  {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ) : field.multiline ? (
              <div key={field.name} className="flex flex-col gap-1">
                <label className="text-[13px] font-medium text-[#2C2C2A]">{field.label}</label>
                <textarea
                  rows={3}
                  value={formData[field.name] || ''}
                  onChange={(e) => { setFormData({ ...formData, [field.name]: e.target.value }); setFormErrors({ ...formErrors, [field.name]: '' }); }}
                  className={`px-3 py-2.5 text-[14px] border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#3B6D11]/30 focus:border-[#3B6D11] ${formErrors[field.name] ? 'border-[#E24B4A]' : 'border-[#d4d0c8]'}`}
                />
                {formErrors[field.name] && <p className="text-[12px] text-[#E24B4A]">{formErrors[field.name]}</p>}
              </div>
            ) : (
              <Input
                key={field.name}
                id={`field-${field.name}`}
                label={field.label}
                value={formData[field.name] || ''}
                onChange={(e) => { setFormData({ ...formData, [field.name]: e.target.value }); setFormErrors({ ...formErrors, [field.name]: '' }); }}
                error={formErrors[field.name]}
              />
            )
          ))}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" loading={submitting} disabled={submitting}>
              {editItem ? 'Save Changes' : 'Add Item'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Confirm Delete"
        maxWidth="max-w-sm"
      >
        <p className="text-[14px] text-[#5F5E5A] mb-5">Are you sure you want to delete this item? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setConfirmDelete(null)}>Cancel</Button>
          <Button variant="danger" loading={deleting} disabled={deleting} onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default ModuleManagerPage;
