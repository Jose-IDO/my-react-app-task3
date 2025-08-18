
import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { jobAPI } from '../services/Api'
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
  const [isLoading, setIsLoading] = useState(true)
  

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all')
  const [sortOrder, setSortOrder] = useState(searchParams.get('sort') || 'desc')


  useEffect(() => {
    loadUserJobs()
  }, [currentUser.id])


  useEffect(() => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    if (statusFilter !== 'all') params.set('status', statusFilter)
    if (sortOrder !== 'desc') params.set('sort', sortOrder)
    
    setSearchParams(params)
    applyFilters()
  }, [searchQuery, statusFilter, sortOrder, jobs])

  const loadUserJobs = async () => {
    try {
      setIsLoading(true)
      const userJobs = await jobAPI.getJobsByUserId(currentUser.id)
      setJobs(userJobs)
    } catch (error) {
      console.error('Failed to load jobs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = () => {
    let result = [...jobs]
    

    if (searchQuery) {
      result = jobAPI.searchJobs(result, searchQuery)
    }
    
   
    result = jobAPI.filterJobsByStatus(result, statusFilter)
    

    result = jobAPI.sortJobsByDate(result, sortOrder as 'asc' | 'desc')
    
    setFilteredJobs(result)
  }

  const handleDeleteJob = async (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      try {
        await jobAPI.deleteJob(jobId)
        setJobs(jobs.filter(job => job.id !== jobId))
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

  const getJobStats = () => {
    const applied = jobs.filter(job => job.status === 'Applied').length
    const interviewed = jobs.filter(job => job.status === 'Interviewed').length
    const rejected = jobs.filter(job => job.status === 'Rejected').length
    const total = jobs.length
    
    return { applied, interviewed, rejected, total }
  }

  const stats = getJobStats()

  if (isLoading) {
    return (
      <div style={{ marginTop: '120px', textAlign: 'center' }}>
        <Text variant="h2">Loading your jobs...</Text>
      </div>
    )
  }

  return (
    <div style={{ marginTop: '120px' }}>
      <Whitebox modcolor="modcolorone">
        <div className={styles.container}>
          <Text variant="h1">Welcome back, {currentUser.username}!</Text>
          <Text variant="h2">Job Application Dashboard</Text>

        
          <div className={styles.stats}>
            <div className={styles.stat}>
              <h2>{stats.total}</h2>
              <span>Total Applications</span>
            </div>
            <div className={styles.stat}>
              <h2 style={{ color: '#fdba3f' }}>{stats.applied}</h2>
              <span>Applied</span>
            </div>
            <div className={styles.stat}>
              <h2 style={{ color: '#4CAF50' }}>{stats.interviewed}</h2>
              <span>Interviewed</span>
            </div>
            <div className={styles.stat}>
              <h2 style={{ color: '#f44336' }}>{stats.rejected}</h2>
              <span>Rejected</span>
            </div>
          </div>

       
          <div className={styles.controls}>
        
            <TextInput
              label="Search by company or role"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '300px' }}
            />


            <div className={styles.buttons}>
              <Buttons onClick={() => navigate('/add-job')}>Add New Job</Buttons>
              
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
            {filteredJobs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Text variant="h2">
                  {jobs.length === 0 
                    ? "No job applications yet. Start by adding your first job!"
                    : "No jobs match your current filters."
                  }
                </Text>
                {jobs.length === 0 && (
                  <Buttons onClick={() => navigate('/add-job')}>Add Your First Job</Buttons>
                )}
              </div>
            ) : (
              filteredJobs.map(job => (
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

                  {job.notes && (
                    <p><strong>Notes:</strong> {job.notes}</p>
                  )}

                  <div className={styles.actions}>
                    <Buttons onClick={() => navigate(`/jobs/${job.id}`)}>
                      View Details
                    </Buttons>
                    <Buttons onClick={() => handleDeleteJob(job.id)}>
                      Delete
                    </Buttons>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Whitebox>
    </div>
  )
}