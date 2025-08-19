import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { jobAPI } from '../services/Api'
import type { Job, JobStatus, JobFormData } from '../types/Job'
import { Whitebox } from '../components/Whitebox/Whitebox'
import { Text } from '../components/Text/Text'
import { TextInput } from '../components/Inputs/TextInput'
import { Button } from '../components/Inputs/Button'
import { Buttons } from '../components/button/Button'

export const JobDetails: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>()
  const navigate = useNavigate()
  
  const [job, setJob] = useState<Job | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editFormData, setEditFormData] = useState<JobFormData>({
    companyName: '',
    role: '',
    status: 'Applied',
    dateApplied: '',
    jobDuties: '',
    requirements: '',
    companyAddress: '',
    contactDetails: '',
    notes: ''
  })

  useEffect(() => {
    if (jobId) {
      loadJob()
    }
  }, [jobId])

  const loadJob = async () => {
    const jobData = await jobAPI.getJobById(jobId!)
    setJob(jobData)
    if (jobData) {
      setEditFormData({
        companyName: jobData.companyName,
        role: jobData.role,
        status: jobData.status,
        dateApplied: jobData.dateApplied,
        jobDuties: jobData.jobDuties || '',
        requirements: jobData.requirements || '',
        companyAddress: jobData.companyAddress || '',
        contactDetails: jobData.contactDetails || '',
        notes: jobData.notes || ''
      })
    }
  }

  const handleEditInputChange = (field: keyof JobFormData, value: string) => {
    setEditFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveEdit = async () => {
    if (!job) return
    await jobAPI.updateJob(job.id, editFormData)
    setJob({ ...job, ...editFormData })
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (!job) return
    await jobAPI.deleteJob(job.id)
    navigate('/dashboard')
  }

  const getStatusColor = (status: JobStatus): string => {
    switch (status) {
      case 'Applied': return '#fdba3f'
      case 'Interviewed': return '#4CAF50'
      case 'Rejected': return '#f44336'
      default: return '#666'
    }
  }

  if (!job) {
    return <div style={{ marginTop: '120px' }}>Loading...</div>
  }

  return (
    <div style={{ marginTop: '120px' }}>
      <Whitebox modcolor="modcolorone">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {!isEditing ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '30px' }}>
                <div>
                  <Text variant="h1">{job.companyName}</Text>
                  <Text variant="h2" style={{ color: '#666' }}>{job.role}</Text>
                </div>
                <div
                  style={{
                    padding: '10px 20px',
                    borderRadius: '25px',
                    color: 'white',
                    backgroundColor: getStatusColor(job.status)
                  }}
                >
                  {job.status}
                </div>
              </div>

              <p><strong>Date Applied:</strong> {new Date(job.dateApplied).toLocaleDateString()}</p>
              {job.companyAddress && <p><strong>Address:</strong> {job.companyAddress}</p>}
              {job.contactDetails && <p><strong>Contact:</strong> {job.contactDetails}</p>}
              {job.jobDuties && (
                <div>
                  <Text variant="h2">Job Duties</Text>
                  <p>{job.jobDuties}</p>
                </div>
              )}
              {job.requirements && (
                <div>
                  <Text variant="h2">Requirements</Text>
                  <p>{job.requirements}</p>
                </div>
              )}
              {job.notes && (
                <div>
                  <Text variant="h2">Notes</Text>
                  <p>{job.notes}</p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '40px' }}>
                <Buttons onClick={() => navigate('/dashboard')}>Back</Buttons>
                <Buttons onClick={() => setIsEditing(true)}>Edit</Buttons>
                <Buttons onClick={handleDelete}>Delete</Buttons>
              </div>
            </div>
          ) : (
            <div>
              <Text variant="h1" style={{ textAlign: 'center' }}>Edit Job Application</Text>

              <TextInput
                label="Company Name"
                value={editFormData.companyName}
                onChange={(e) => handleEditInputChange('companyName', e.target.value)}
              />
              
              <TextInput
                label="Role"
                value={editFormData.role}
                onChange={(e) => handleEditInputChange('role', e.target.value)}
              />
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ color: 'rgb(20, 20, 20)', fontWeight: '500' }}>Status</label>
                <select
                  value={editFormData.status}
                  onChange={(e) => handleEditInputChange('status', e.target.value as JobStatus)}
                  style={{ padding: '10px', borderRadius: '4px', border: '1px solid rgb(20, 20, 20)', width: '100%' }}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interviewed">Interviewed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              
              <TextInput
                label="Date Applied"
                type="date"
                value={editFormData.dateApplied}
                onChange={(e) => handleEditInputChange('dateApplied', e.target.value)}
              />
              
              <TextInput
                label="Company Address"
                value={editFormData.companyAddress}
                onChange={(e) => handleEditInputChange('companyAddress', e.target.value)}
              />
              
              <TextInput
                label="Contact Details"
                value={editFormData.contactDetails}
                onChange={(e) => handleEditInputChange('contactDetails', e.target.value)}
              />
              
              <TextInput
                label="Job Duties"
                type="textarea"
                value={editFormData.jobDuties}
                onChange={(e) => handleEditInputChange('jobDuties', e.target.value)}
              />
              
              <TextInput
                label="Requirements"
                type="textarea"
                value={editFormData.requirements}
                onChange={(e) => handleEditInputChange('requirements', e.target.value)}
              />
              
              <TextInput
                label="Notes"
                type="textarea"
                value={editFormData.notes}
                onChange={(e) => handleEditInputChange('notes', e.target.value)}
              />

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '30px' }}>
                <Buttons onClick={() => setIsEditing(false)}>Cancel</Buttons>
                <Button value="Save Changes" onClick={handleSaveEdit} />
              </div>
            </div>
          )}
        </div>
      </Whitebox>
    </div>
  )
}