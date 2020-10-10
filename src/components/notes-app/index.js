import React, { Component, useState } from 'react';
import './index.css';

const NotesApp = () => {
	const [loading, setloading] = useState(false);
	const [data, setdata] = useState([]);
	const [filtered, setfilterd] = useState([]);
	const [formdata, setformdata] = useState({
		title: '',
		status: '',
	});
	const { title, status } = formdata;
	const onChangeHandler = (e) =>
		setformdata({ ...formdata, [e.target.name]: e.target.value });
	const addhandler = (e) => {
		e.preventDefault();
		setloading(true);
		setdata([...data, { title: formdata.title, status: formdata.status }]);
		setfilterd([...data]);
	};
	const fillter = (type) => {
		console.log(filtered);
		if (data.length > 1) {
			if (type === 'All') {
				let test = filtered.filter((item) => item.status === 'All');
				setfilterd([...data]);
				setdata([...test]);
			} else if (type === 'Active') {
				let test = filtered.filter((item) => item.status === 'Active');
				setdata([...test]);
			} else if (type === 'Completed') {
				let test = filtered.filter(
					(item) => item.status === 'Completed',
				);

				setdata([...test]);
			}
		}
	};
	return (
		<div className='layout-column align-items-center justify-content-start'>
			<section className='layout-row align-items-center justify-content-center mt-30'>
				<input
					data-testid='input-note-name'
					type='text'
					name='title'
					value={title}
					onChange={(e) => onChangeHandler(e)}
					className='large mx-8'
					placeholder='Note Title'
				/>
				<input
					data-testid='input-note-status'
					type='text'
					name='status'
					value={status}
					onChange={(e) => onChangeHandler(e)}
					className='large mx-8'
					placeholder='Note Status'
				/>
				<button
					onClick={(e) => addhandler(e)}
					className=''
					data-testid='submit-button'>
					Add Note
				</button>
			</section>

			<div className='mt-50'>
				<ul className='tabs'>
					<li
						className='tab-item slide-up-fade-in'
						data-testid='allButton'>
						<button onClick={() => fillter('All')}> All</button>
					</li>
					<li
						className='tab-item slide-up-fade-in'
						data-testid='activeButton'>
						<button onClick={() => fillter('Active')}>
							Active{' '}
						</button>
					</li>
					<li
						className='tab-item slide-up-fade-in'
						data-testid='completedButton'>
						<button onClick={() => fillter('Completed')}>
							Completed{' '}
						</button>
					</li>
				</ul>
			</div>
			<div className='card w-40 pt-30 pb-8'>
				<table>
					<thead>
						<tr>
							<th>Title</th>
							<th>Status</th>
						</tr>
					</thead>
					{loading && (
						<tbody data-testid='noteList'>
							{data.map((item) => (
								<tr key={item.title}>
									<td>{item.title}</td>

									<td>{item.status}</td>
								</tr>
							))}
						</tbody>
					)}
				</table>
			</div>
		</div>
	);
};
export default NotesApp;
