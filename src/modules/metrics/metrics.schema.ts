export const getAllMetricsSchema = {
  description: 'Retrieve all metrics',
  tags: ['Metrics'],
} as const;

export const getMetricSchema = {
  description: 'Retrieve a metric by ID',
  tags: ['Metrics'],
} as const;

export const createMetricSchema = {
  description: 'Create a new metric',
  tags: ['Metrics'],
} as const;

export const updateMetricSchema = {
  description: 'Update a metric',
  tags: ['Metrics'],
} as const;

export const deleteMetricSchema = {
  description: 'Delete a metric',
  tags: ['Metrics'],
} as const;
