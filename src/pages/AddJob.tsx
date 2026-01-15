import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jobAPI } from '../services/Api'
import type { JobFormData, User, JobStatus } from '../types/Job'
import { Whitebox } from '../components/Whitebox/Whitebox'
import { Text } from '../components/Text/Text'
import { TextInput } from '../components/Inputs/TextInput'
import { Button } from '../components/Inputs/Button'
import { Buttons } from '../components/button/Button'

type AddJobProps = {
  currentUser: User
}

export const AddJob: React.FC<AddJobProps> = ({ currentUser }) => {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState<JobFormData>({
    companyName: '',
    role: '',
    status: 'Applied',
    dateApplied: new Date().toISOString().split('T')[0],
    jobDuties: '',
    requirements: '',
    companyAddress: '',
    contactDetails: '',
    notes: ''
  })

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.companyName || !formData.role) {
      alert('Please fill in company name and role')
      return
    }
    
    await jobAPI.createJob(formData, currentUser.id)
    navigate('/dashboard')
  }

  return (
    <div style={{ marginTop: '120px' }}>
      <Whitebox modcolor="modcolorone">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Text variant="h1" style={{ textAlign: 'center' }}>Add New Job Application</Text>

          <TextInput
            label="Company Name"
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
          />
          
          <TextInput
            label="Role"
            value={formData.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
          />
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: 'rgb(20, 20, 20)', fontWeight: '500', fontSize: '14px', display: 'block', marginBottom: '8px' }}>Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value as JobStatus)}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd', width: '100%', cursor: 'pointer', fontSize: '14px', transition: 'border-color 0.2s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3a7475'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#ddd'}
            >
              <option value="Applied">Applied</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          
          <TextInput
            label="Date Applied"
            type="date"
            value={formData.dateApplied}
            onChange={(e) => handleInputChange('dateApplied', e.target.value)}
          />
          
          <TextInput
            label="Company Address"
            value={formData.companyAddress || ''}
            onChange={(e) => handleInputChange('companyAddress', e.target.value)}
          />
          
          <TextInput
            label="Contact Details"
            value={formData.contactDetails || ''}
            onChange={(e) => handleInputChange('contactDetails', e.target.value)}
          />
          
          <TextInput
            label="Job Duties"
            type="textarea"
            value={formData.jobDuties || ''}
            onChange={(e) => handleInputChange('jobDuties', e.target.value)}
          />
          
          <TextInput
            label="Requirements"
            type="textarea"
            value={formData.requirements || ''}
            onChange={(e) => handleInputChange('requirements', e.target.value)}
          />
          
          <TextInput
            label="Notes"
            type="textarea"
            value={formData.notes || ''}
            onChange={(e) => handleInputChange('notes', e.target.value)}
          />

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '30px', flexWrap: 'wrap' }}>
            <Buttons onClick={() => navigate('/dashboard')}>Cancel</Buttons>
            <Button value="Add Job Application" onClick={handleSubmit} />
          </div>
        </div>
      </Whitebox>
    </div>
  )
}