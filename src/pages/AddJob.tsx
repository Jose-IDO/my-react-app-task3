
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
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({
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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required'
    }
    
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required'
    }
    
    if (!formData.dateApplied) {
      newErrors.dateApplied = 'Date applied is required'
    }
    

    if (formData.dateApplied && new Date(formData.dateApplied) > new Date()) {
      newErrors.dateApplied = 'Date applied cannot be in the future'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return
    
    try {
      setIsSubmitting(true)
      await jobAPI.createJob(formData, currentUser.id)
      navigate('/dashboard')
    } catch (error) {
      console.error('Failed to create job:', error)
      alert('Failed to create job application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{ marginTop: '120px' }}>
      <Whitebox modcolor="modcolorone">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Text variant="h1" style={{ textAlign: 'center', marginBottom: '30px' }}>
            Add New Job Application
          </Text>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <div>
              <Text variant="h2">Required Information</Text>
              
              <TextInput
                label="Company Name *"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                error={errors.companyName}
              />
              
              <TextInput
                label="Role/Position *"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                error={errors.role}
              />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ color: 'rgb(20, 20, 20)' }}>Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value as JobStatus)}
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
                value={formData.dateApplied}
                onChange={(e) => handleInputChange('dateApplied', e.target.value)}
                error={errors.dateApplied}
              />
            </div>


            <div>
              <Text variant="h2">Additional Details (Optional)</Text>
              
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
            </div>


            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '30px' }}>
              <Buttons onClick={() => navigate('/dashboard')}>
                Cancel
              </Buttons>
              <Button
                value={isSubmitting ? 'Adding...' : 'Add Job Application'}
                onClick={handleSubmit}
                disabled={isSubmitting}
                style={{ 
                  backgroundColor: isSubmitting ? '#ccc' : '#032729',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              />
            </div>
          </div>
        </div>
      </Whitebox>
    </div>
  )
}