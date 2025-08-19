import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { jobAPI } from '../services/api'
import type { Job, User, JobStatus } from '../types/Job'
import { Whitebox } from '../components/Whitebox/Whitebox'
import { Text } from '../components/Text/Text'
import { Buttons } from '../components/button/Button'
import { TextInput } from '../components/Inputs/TextInput'
import styles from '../components/Page styling/dashboard.module.css'

type DashboardProps = {
  currentUser: User
}

export const Dashboard: React.FC<DashboardProps> = ({ currentUser }) => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all')
  const [sortOrder, setSortOrder] = useState(searchParams.get('sort') || 'desc')

  useEffect(() => {
    loadJobs()
  }, [])

  useEffect(() => {
    updateURL()
    applyFilters()
  }, [searchQuery, statusFilter, sortOrder, jobs])

  const loadJobs = async () => {
    const userJobs = await jobAPI.getJobsByUserId(currentUser.id)
    setJobs(userJobs)
  }

  const updateURL = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    if (statusFilter !== 'all') params.set('status', statusFilter)
    if (sortOrder !== 'desc') params.set('sort', sortOrder)
    setSearchParams(params)
  }

  const applyFilters = () => {
    let result = [...jobs]
    

    if (searchQuery) {
      result = result.filter(job => 
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.role.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    

    if (statusFilter !== 'all') {
      result = result.filter(job => job.status === statusFilter)
    }
    
 
    result.sort((a, b) => {
      const dateA = new Date(a.dateApplied).getTime()
      const dateB = new Date(b.dateApplied).getTime()
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    })
    
    setFilteredJobs(result)
  }

  const handleDeleteJob = async (jobId: string) => {
    await jobAPI.deleteJob(jobId)
    setJobs(jobs.filter(job => job.id !== jobId))
  }

  const getStatusColor = (status: JobStatus): string => {
    switch (status) {
      case 'Applied': return '#fdba3f'
      case 'Interviewed': return '#4CAF50'
      case 'Rejected': return '#f44336'
      default: return '#666'
    }
  }

  return (
    <div style={{ marginTop: '120px' }}>
      <Whitebox modcolor="modcolorone">
        <div className={styles.container}>
          <Text variant="h1">Job Application Dashboard</Text>


          <div className={styles.controls}>
            <TextInput
              label="Search by company or role"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className={styles.buttons}>
              <Buttons onClick={() => navigate('/add-job')}>Add Job</Buttons>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ padding: '10px', borderRadius: '5px' }}
              >
                <option value="all">All Statuses</option>
                <option value="Applied">Applied</option>
                <option value="Interviewed">Interviewed</option>
                <option value="Rejected">Rejected</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={{ padding: '10px', borderRadius: '5px' }}
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>


          <div className={styles.jobsList}>
            {filteredJobs.map(job => (
              <div key={job.id} className={styles.jobCard}>
                <div className={styles.jobHeader}>
                  <div>
                    <h2>{job.companyName}</h2>
                    <h3>{job.role}</h3>
                    <p>Applied: {new Date(job.dateApplied).toLocaleDateString()}</p>
                  </div>
                  <div
                    className={styles.status}
                    style={{ backgroundColor: getStatusColor(job.status) }}
                  >
                    {job.status}
                  </div>
                </div>

                <div className={styles.actions}>
                  <Buttons onClick={() => navigate(`/jobs/${job.id}`)}>View Details</Buttons>
                  <Buttons onClick={() => handleDeleteJob(job.id)}>Delete</Buttons>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Whitebox>
    </div>
  )
}