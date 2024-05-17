export interface Workflow {
  accountSid: string
  dateCreated: string
  dateUpdated: string
  defaultActivityName: string
  defaultActivityDid: string
  eventCallbackUrl: string
  eventsFilter: any
  friendlyName: string
  multiTaskEnabled: boolean
  prioritizeQueueOrder: string
  sid: string
  timeoutActivityName: string
  timeoutActivitySid: string
  url: string
}

export interface Workspace {
  accountSid: string
  dateCreated: string
  dateUpdated: string
  defaultActivityName: string
  defaultActivitySid: string
  eventCallbackUrl: string
  eventsFilter: any
  friendlyName: string
  multiTaskEnabled: boolean
  prioritizeQueueOrder: string
  sid: string
  timeoutActivityName: string
  timeoutActivitySid: string
  url: string
}

export interface Attribute {
  [key: string]: string | string[] | undefined;
}

export interface Worker {
  sid: string
  friendlyName: string
  accountSid: string
  activitySid: string
  activityName: string
  workspaceSid: string
  attributes: Attribute[]
  available: boolean
  dateCreated: string
  dateUpdated: string
  dateStatusChanged: string
  operatingUnitSid: string
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

export interface Activity {
  accountSid: string
  available: boolean
  dateCreated: string
  dateUpdated: string
  friendlyName: string
  sid: string
  workspaceSid: string
  url: string
}