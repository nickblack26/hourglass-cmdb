export interface Workflow {
  accountSid: string
  assignmentCallbackUrl: string
  configuration: string
  dateCreated: string
  dateUpdated: string
  documentContentType: string
  fallbackAssignmentCallbackUrl: any
  friendlyName: string
  sid: string
  taskReservationTimeout: number
  url: string
  workspaceSid: string
}

export interface Queue {
  	accountSid: string,
    assignmentActivitySid:string
    assignmentActivityName:string
    dateCreated: string
    dateUpdated: string
    friendlyName: string
	maxReservedWorkers: number,
	reservationActivitySid: string | null
	reservationActivityName: string | null
    sid: string,
    targetWorkers: string,
	taskOrder: 'FIFO' | 'LIFO',
    url: string
    workspaceSid: string
}
