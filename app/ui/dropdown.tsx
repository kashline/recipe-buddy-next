import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../lib/hooks'
import { CreateRecipeState, selectCreateRecipe } from '../lib/features/recipe/createRecipeSlice'

export default function Dropdown({options, setFunction, label}: {options: string[], placeholder: string, setFunction: Function, label: string}) {
	const friendlyLabel = `${label[0].toUpperCase()}${label.slice(1)}`
	const createRecipe = useAppSelector(selectCreateRecipe)
	const dispatch = useAppDispatch()
	const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		dispatch(setFunction(event.currentTarget.textContent))
	}
	return (
		<div style={{ display: 'inline-flex', paddingRight: 10 }}>
			<label style={{ marginTop: '0.5rem', paddingRight: '0.5rem' }}>{friendlyLabel}</label>
			<Menu as='div' style={{ position: 'relative', display: 'inline-block', textAlign: 'center'}}>
				<Menu.Button style={{ 
					borderWidth: 0.5,
					borderColor: 'gray',
					display: 'inline-flex',
					backgroundColor: 'white',
					height: '2rem',
					borderRadius: '0.25rem'
					}}>
						<div style={{
							textAlign: 'center',
							margin: 'auto',
							display: 'inline-flex',
							paddingLeft: '0.5rem',
							width: 125
						}}>
							{createRecipe[label as keyof CreateRecipeState] as String}
						</div>
					<ChevronDownIcon
							className=""
							style={{
								height: 20,
								width: 20,
								color: 'rgb(96 165 250)',
								alignContent: 'right',
								marginRight: '0.25rem',
								marginTop: '0.25rem'
							}}
							aria-hidden="true"
							/>
				</Menu.Button>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items
					className="absolute left-0 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
					>    
						<div className='px-1 py-1 inline-block w-full'>
							{options.map((option, index) => {return(
								<div key={index} className='left-0 top-full w-full z-10'>
									<Menu.Item>
										{<button
												style={{ 
													width: '100%',
													textAlign: 'left',
													border: 'none',
													paddingLeft: 5,
													boxShadow: 'none',
													borderStyle: 'solid',
													borderWidth: 1
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
		</div>
	)
}