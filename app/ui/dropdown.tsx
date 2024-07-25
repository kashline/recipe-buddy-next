import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment, useState } from 'react'
import { useAppDispatch } from '../lib/hooks'

export default function Dropdown({options, placeholder, setFunction, label}: {options: string[], placeholder: string, setFunction: Function, label: string}) {
	const friendlyLabel = `${label[0].toUpperCase()}${label.slice(1)}`
	const [currentSelection, setCurrentSelection] = useState(placeholder)
	const dispatch = useAppDispatch()
	const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault()
		setCurrentSelection(event.currentTarget.textContent!)
		dispatch(setFunction(event.currentTarget.textContent))
	}
	return (
		<>
			<label style={{ marginTop: '1rem'}}>{friendlyLabel}</label>
			<Menu as='div' className='relative inline-block text-left'>
				<div>
					<Menu.Button className='mx-2 border-solid border-2 border-grey-light inline-flex bg-white w-fit'>
						{currentSelection}
						<ChevronDownIcon
							className="-mr-1 ml-2 h-5 w-5 text-blue-400 hover:text-blue-200"
							aria-hidden="true"
							/>
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute z-10 left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">    
						<div className='px-1 py-1 inline-block w-full'>
							{options.map((option, index) => {return(
								<div key={index} className='left-0 top-full w-full z-10'>
									<Menu.Item>
										{<button
												style={{ 
													width: '100%',
													textAlign: 'left',
													border: 'none'
												}}
												onClick={handleOnClick}
												>
												{option}
											</button>
										}
									</Menu.Item>
								</div>
							)})}
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</>
	)
}