import { useState } from 'react';
import { Input, Button } from 'antd';
import './index.scss';

interface IProps {
	addTask: (value: any) => void;
}

function AddTask(props: IProps) {
	const { addTask } = props;

	const [task, setTask] = useState<string>();


	return (
		<div className='add-task'>
			<Input
				style={{ width: 300, marginRight: 8 }}
				placeholder='请输入任务'
				onChange={(e) => {
					const { value } = e.target;
					setTask(value);
				}}
				value={task} />
			<Button
				type="primary"
				onClick={() => {
					addTask(task);
					setTask('')
				}}>新增任务</Button>
		</div>
	)
}

export default AddTask;