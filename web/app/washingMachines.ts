// Washing machine status mock data
export type WashingMachine = {
	id: number
	name: string
	status: 'free' | 'running'
}

export const washingMachines: WashingMachine[] = [
	{ id: 1, name: 'Machine 1', status: 'free' },
	{ id: 2, name: 'Machine 2', status: 'running' },
	{ id: 3, name: 'Machine 3', status: 'free' },
	{ id: 4, name: 'Machine 4', status: 'running' },
	// { id: 5, name: 'Machine 5', status: 'free' },
	// { id: 6, name: 'Machine 6', status: 'running' },
]
