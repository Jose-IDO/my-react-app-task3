// src/pages/JobDetails.tsx
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { jobAPI } from '../services/Api'
import type { Job, User, JobStatus, JobFormData } from '../types/Job'
import { Whitebox } from '../components/Whitebox/Whitebox'
import { Text } from '../components/Text/Text'
import { TextInput } from '../components/Inputs/TextInput'
import { Button } from '../components/Inputs/Button'
import { Buttons } from '../components/button/Button'

type JobDetailsProps = {
  currentUser: User
}

export const JobDetails: React.FC<JobDetailsProps> = ({ currentUser }) => {
  const { jobId } = useParams<{ jobId: string }>()
  const navigate = useNavigate()
  
  const [job, setJob] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(true)
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
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (jobId) {
      loadJob()
    }
  }, [jobId])

  const loadJob = async () => {
    try {
      setIsLoading(true)
      const jobData = await jobAPI.getJobById(jobId!)
      
      if (!jobData) {
        alert('Job not found')
        navigate('/dashboard')
        return
      }
      

      if (jobData.userId !== currentUser.id) {
        alert('You do not have permission to view this job')
        navigate('/dashboard')
        return
      }
      
      setJob(jobData)

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
    } catch (error) {
      console.error('Failed to load job:', error)
      alert('Failed to load job details')
      navigate('/dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditInputChange = (field: keyof JobFormData, value: string) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateEditForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!editFormData.companyName.trim()) {
      newErrors.companyName = 'Company name is required'
    }
    
    if (!editFormData.role.trim()) {
      newErrors.role = 'Role is required'
    }
    
    if (!editFormData.dateApplied) {
      newErrors.dateApplied = 'Date applied is required'
    }
    
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveEdit = async () => {
    if (!validateEditForm() || !job) return
    
    try {
      setIsSubmitting(true)
      const updatedJob = await jobAPI.updateJob(job.id, editFormData)
      setJob(updatedJob)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update job:', error)
      alert('Failed to update job. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!job) return
    
    if (window.confirm('Are you sure you want to delete this job application? This action cannot be undone.')) {
      try {
        await jobAPI.deleteJob(job.id)
        navigate('/dashboard')
      } catch (error) {
        console.error('Failed to delete job:', error)
        alert('Failed to delete job. Please try again.')
      }
    }
  }

  const getStatusColor = (status: JobStatus): string => {
    switch (status) {
      case 'Applied': return '#fdba3f'
      case 'Interviewed': return '#4CAF50'
      case 'Rejected': return '#f44336'
      default: return '#666'
    }
  }

  if (isLoading) {
    return (
      <div style={{ marginTop: '120px', textAlign: 'center' }}>
        <Text variant="h2">Loading job details...</Text>
      </div>
    )
  }

  if (!job) {
    return (
      <div style={{ marginTop: '120px', textAlign: 'center' }}>
        <Text variant="h2">Job not found</Text>
        <Buttons onClick={() => navigate('/dashboard')}>Back to Dashboard</Buttons>
      </div>
    )
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
                    backgroundColor: getStatusColor(job.status),
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  {job.status}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                <div>
                  <Text variant="h2">Application Details</Text>
                  <p><strong>Date Applied:</strong> {new Date(job.dateApplied).toLocaleDateString()}</p>
                  {job.companyAddress && <p><strong>Address:</strong> {job.companyAddress}</p>}
                  {job.contactDetails && <p><strong>Contact:</strong> {job.contactDetails}</p>}
                </div>
              </div>

              {job.jobDuties && (
                <div style={{ marginBottom: '20px' }}>
                  <Text variant="h2">Job Duties</Text>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{job.jobDuties}</p>
                </div>
              )}

              {job.requirements && (
                <div style={{ marginBottom: '20px' }}>
                  <Text variant="h2">Requirements</Text>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{job.requirements}</p>
                </div>
              )}

              {job.notes && (
                <div style={{ marginBottom: '20px' }}>
                  <Text variant="h2">Notes</Text>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{job.notes}</p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '40px' }}>
                <Buttons onClick={() => navigate('/dashboard')}>Back to Dashboard</Buttons>
                <Buttons onClick={() => setIsEditing(true)}>Edit</Buttons>
                <Buttons onClick={handleDelete}>Delete</Buttons>
              </div>
            </div>
          ) : (
            // Edit Mode
            <div>
              <Text variant="h1" style={{ textAlign: 'center', marginBottom: '30px' }}>
                Edit Job Application
              </Text>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <Text variant="h2">Required Information</Text>
                  
                  <TextInput
                    label="Company Name *"
                    value={editFormData.companyName}
                    onChange={(e) => handleEditInputChange('companyName', e.target.value)}
                    error={errors.companyName}
                  />
                  
                  <TextInput
                    label="Role/Position *"
                    value={editFormData.role}
                    onChange={(e) => handleEditInputChange('role', e.target.value)}
                    error={errors.role}
                  />
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ color: 'rgb(20, 20, 20)' }}>Status *</label>
                    <select
                      value={editFormData.status}
                      onChange={(e) => handleEditInputChange('status', e.target.value as JobStatus)}
                      style={{
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid rgb(20, 20, 20)',
                        outline: 'none'
                      }}
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interviewed">Interviewed</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  
                  <TextInput
                    label="Date Applied *"
                    type="date"
                    value={editFormData.dateApplied}
                    onChange={(e) => handleEditInputChange('dateApplied', e.target.value)}
                    error={errors.dateApplied}
                  />
                </div>

                <div>
                  <Text variant="h2">Additional Details</Text>
                  
                  <TextInput
                    label="Company Address"
                    value={editFormData.companyAddress || ''}
                    onChange={(e) => handleEditInputChange('companyAddress', e.target.value)}
                  />
                  
                  <TextInput
                    label="Contact Details"
                    value={editFormData.contactDetails || ''}
                    onChange={(e) => handleEditInputChange('contactDetails', e.target.value)}
                  />
                  
                  <TextInput
                    label="Job Duties"
                    type="textarea"
                    value={editFormData.jobDuties || ''}
                    onChange={(e) => handleEditInputChange('jobDuties', e.target.value)}
                  />
                  
                  <TextInput
                    label="Requirements"
                    type="textarea"
                    value={editFormData.requirements || ''}
                    onChange={(e) => handleEditInputChange('requirements', e.target.value)}
                  />
                  
                  <TextInput
                    label="Notes"
                    type="textarea"
                    value={editFormData.notes || ''}
                    onChange={(e) => handleEditInputChange('notes', e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '30px' }}>
                  <Buttons onClick={() => setIsEditing(false)}>Cancel</Buttons>
                  <Button
                    value={isSubmitting ? 'Saving...' : 'Save Changes'}
                    onClick={handleSaveEdit}
                    disabled={isSubmitting}
                    style={{
                      backgroundColor: isSubmitting ? '#ccc' : '#032729',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Whitebox>
    </div>
  )
}