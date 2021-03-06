import React, { useState } from 'react'
import {
	Typography,
	Select,
	MenuItem,
	InputLabel,
	ThemeProvider,
} from '@material-ui/core'
import { connect } from 'react-redux'

import {
	StyledSubmit,
	StyledContainer,
	StyledPaper,
	StyledSelect,
} from '../../styles/styled'
import { Formtheme } from '../../styles/muiTheme'
import { MONTHS } from '../../assets'
import { addDate } from '../../store/actions/addDate'
import { Redirect } from 'react-router-dom'

const Create = ({ addDate, auth, user }) => {
	const [month, setMonth] = useState('April')
	const [date, setDate] = useState('1')

	const addNewDate = e => {
		e.preventDefault()
		addDate({ month, date, user })
	}

	if (!auth) return <Redirect to='/signin' />

	return (
		<ThemeProvider theme={Formtheme}>
			<StyledContainer maxWidth='sm'>
				<StyledPaper component='form' onSubmit={addNewDate}>
					<Typography variant='h4' align='center' children='Create' />
					<StyledSelect fullWidth>
						<InputLabel htmlFor='Month'>Month</InputLabel>
						<Select
							id='Month'
							label='Month'
							onChange={e => setMonth(e.target.value)}
							value={month}
						>
							{MONTHS.map(i => {
								return (
									<MenuItem
										value={i.month}
										key={i.month}
										children={i.month}
									/>
								)
							})}
						</Select>
					</StyledSelect>
					<StyledSelect fullWidth>
						<InputLabel htmlFor='Date'>Date</InputLabel>
						<Select
							id='Date'
							label='Date'
							onChange={e => setDate(e.target.value)}
							value={date}
						>
							{Array.from(
								{
									length: MONTHS.filter(_ => _.month === month)[0]
										.days,
								},
								(v, i) => i + 1
							).map((i, _) => {
								return (
									<MenuItem
										value={i}
										key={`${month + _}`}
										children={i}
									/>
								)
							})}
						</Select>
					</StyledSelect>
					<StyledSubmit
						color='primary'
						variant='outlined'
						disabled={user.isAdded}
					>
						Add
					</StyledSubmit>
				</StyledPaper>
			</StyledContainer>
		</ThemeProvider>
	)
}

const mapStateToProps = state => ({
	auth: state.firebase.auth.uid,
	user: state.firebase.profile,
})

const mapDispatchToProps = dispatch => ({
	addDate: date => dispatch(addDate(date)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Create)
