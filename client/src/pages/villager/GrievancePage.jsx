import { useState, useEffect } from 'react';
import { submitGrievance, fetchMyGrievances } from '../../api/grievance.api';
import { useToast } from '../../context/ToastContext';
import VillagerLayout from '../../components/layout/VillagerLayout';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { SkeletonRow } from '../../components/ui/SkeletonCard';
import { formatDateShort } from '../../utils/formatDate';
import { MessageSquare } from 'lucide-react';

const GrievancePage = () => {
  const { showToast } = useToast();
  const [description, setDescription] = useState('');
  const [descError, setDescError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [grievances, setGrievances] = useState([]);
  const [listLoading, setListLoading] = useState(true);

  const loadGrievances = async () => {
    setListLoading(true);
    try {
      const { data } = await fetchMyGrievances();
      setGrievances(data.grievances || []);
    } catch {
      showToast('Failed to load your grievances', 'error');
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => { loadGrievances(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return setDescError('Please describe your grievance.');
    setDescError('');
    setSubmitting(true);
    try {
      await submitGrievance({ description: description.trim() });
      setDescription('');
      showToast('Grievance submitted successfully!', 'success');
      loadGrievances();
    } catch (err) {
      showToast(err.response?.data?.message || 'Submission failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <VillagerLayout>
      <div className="mb-6">
        <h1 className="text-[22px] font-medium text-[#2C2C2A]">Grievances</h1>
        <p className="text-[14px] text-[#5F5E5A] mt-1">Submit and track your complaints</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submit form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-[#3B6D11]/10 p-5">
            <h2 className="text-[15px] font-medium text-[#2C2C2A] mb-4">Submit a Grievance</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="text-[13px] font-medium text-[#2C2C2A] block mb-1">Description</label>
                <textarea
                  id="grievance-description"
                  rows={5}
                  value={description}
                  onChange={(e) => { setDescription(e.target.value); setDescError(''); }}
                  placeholder="Describe your issue in detail..."
                  className={`
                    w-full px-3 py-2.5 text-[14px] text-[#2C2C2A] bg-white border rounded-lg
                    placeholder:text-[#9e9d99] resize-none
                    focus:outline-none focus:ring-2 focus:ring-[#3B6D11]/30 focus:border-[#3B6D11]
                    transition-all
                    ${descError ? 'border-[#E24B4A]' : 'border-[#d4d0c8]'}
                  `}
                />
                {descError && <p className="text-[12px] text-[#E24B4A] mt-1">{descError}</p>}
              </div>
              <Button
                id="grievance-submit-btn"
                type="submit"
                loading={submitting}
                disabled={submitting}
                className="w-full"
              >
                Submit Grievance
              </Button>
            </form>
          </div>
        </div>

        {/* Grievances list */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-[#3B6D11]/10 overflow-hidden">
            <div className="px-5 py-4 border-b border-[#EAF3DE]">
              <h2 className="text-[15px] font-medium text-[#2C2C2A]">My Grievances</h2>
            </div>

            {listLoading ? (
              <table className="w-full">
                <tbody>
                  {Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)}
                </tbody>
              </table>
            ) : grievances.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <MessageSquare size={40} strokeWidth={1.5} color="#d4d0c8" className="mx-auto mb-3" />
                <p className="text-[14px] font-medium text-[#2C2C2A]">No grievances yet</p>
                <p className="text-[13px] text-[#5F5E5A] mt-1">Submit one using the form.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="bg-[#F1EFE8]">
                      <th className="text-left px-5 py-3 font-medium text-[#5F5E5A]">Description</th>
                      <th className="text-left px-4 py-3 font-medium text-[#5F5E5A]">Status</th>
                      <th className="text-left px-4 py-3 font-medium text-[#5F5E5A] whitespace-nowrap">Submitted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAF3DE]">
                    {grievances.map((g) => (
                      <tr key={g._id} className="hover:bg-[#F1EFE8]/50 transition-colors">
                        <td className="px-5 py-3 text-[#2C2C2A] max-w-[250px]">
                          <p className="truncate" title={g.description}>{g.description}</p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge status={g.status} />
                        </td>
                        <td className="px-4 py-3 text-[#5F5E5A] whitespace-nowrap">
                          {formatDateShort(g.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </VillagerLayout>
  );
};

export default GrievancePage;
