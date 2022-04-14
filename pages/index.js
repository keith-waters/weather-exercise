import { useEffect } from 'react'
import json from '../data/sample_response.json'

// use json data
// 	main.temp_min
// 	main.temp_max
// 	weather[0].main 
// 	dt_txt is the date

// Day component
// 	weekday
// 	icon
// 		if one of these shows up use it in this order
// 			rainy
// 			cloudy
// 			partly cloudy
// 			sunny
// 	max temp
// 		go through the day and find the maximum
// 	min temp
// 		go through the day and find the minimum

// to display a list of the day components
//


const formatDayData = (days) => {
	const newData = []

//	let min = Infinity
//	let max = -Infinity
//	let icon = "sunny"
//	let weekday = ''
	
	const dayData = {}
	days.forEach(day => {
		const date = new Date(day.dt_txt)
		const key = date.getMonth() + '' + date.getDate()
		if(dayData[key]) {
			dayData[key].minTemp = dayData[key].minTemp > day.main.temp_min ? day.main.temp_min : dayData[key].minTemp
			dayData[key].maxTemp = dayData[key].maxTemp > day.main.temp_max ? day.main.temp_max : dayData[key].maxTemp
			
			// dayData[key].icon = getIcon(day)
		} else {
			dayData[key] = {
				minTemp: day.main.temp_min,
				maxTemp: day.main.temp_max,
				icon: day.weather[0].main
//				weekday: date.toLocaleDateString()
			}
		}
	})

}


const Day = (props) => {
	const { day, minTemp, maxTemp, iconUrl } = props
	return (
		<div>
			<div>
				{day}
			</div>
			<div>
				<img src={iconUrl} /> 
			</div>
			<div>
				<span>
					{minTemp} f
				</span>
				<span>
					{" "}
				</span>
				<span>
					{maxTemp} f
				</span>
			</div>
		</div>
	)
}

export default function Home() {

	useEffect(() => {
		const getData = async () => {
			formatDayData(json.list)
		}
		getData()
	}, [])

  return (
    <div>
			<Day 
				day='Wed'
				minTemp='68'
				maxTemp='78'
				iconUrl='https://staging-webapp.titanhst.com/project/cloudy.png'
			/>
    </div>
  )
}
