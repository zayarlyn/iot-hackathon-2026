'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useSWR from 'swr'
import { washingMachines as initialMachines } from './washingMachines'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function Home() {
	const {
		data: device,
		isLoading,
		error,
	} = useSWR('http://localhost:8080/device/1', fetcher, {
		refreshInterval: 5000, // poll every 5s
		revalidateOnFocus: false, // optional: don’t refetch when tab refocuses
		dedupingInterval: 1000, // optional: avoid rapid duplicate requests
	})

	console.log(device)

	if (!device) return null

	// ...existing code...
	return (
		<main className='min-h-screen bg-zinc-50 dark:bg-black flex flex-col items-center py-16'>
			<h1 className='text-4xl font-bold text-center text-zinc-900 dark:text-zinc-100'>Public Laundry Availability</h1>
			<p className='text-2xl text-center mt-4 mb-10'>Data is updated every 5 seconds</p>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl px-4'>
				{initialMachines.map((machine, idx) => (
					<Card key={machine.id} className='flex flex-col items-center p-6'>
						<CardHeader className='w-full flex flex-col items-center'>
							<CardTitle className='text-xl mb-2'>{machine.name}</CardTitle>
						</CardHeader>
						<CardContent className='w-full flex flex-col items-center'>
							<div
								className={`w-20 h-20 rounded-full mb-4 border-4 ${
									device.status === 'idle' || idx != 1 ? 'bg-green-500 border-green-600 shadow-green-200' : 'bg-red-500 border-red-600 shadow-red-200'
								} shadow-lg transition-colors`}
							/>
							<span className={`text-lg font-semibold ${device.status === 'idle' || idx != 1 ? 'text-green-600' : 'text-red-600'} mb-4`}>
								{device.status === 'idle' || idx != 1 ? 'Available' : 'Running'}
							</span>
							<b>
								<span>Cycle: {device.status}</span>
							</b>
						</CardContent>
					</Card>
				))}
			</div>
		</main>
	)
}
