import React, { Component } from "react";
import Slider from '@mui/material/Slider';
// import BarChart from "./BarChart";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Label, Legend, CartesianGrid, ResponsiveContainer} from 'recharts';

class CostDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numStudents: 0,
            numSchoolDays: 0,
            dishwasher : false,
            data : [{'x':0, 'dispPrice':0, 'reusPrice':0}, {'x':0, 'dispPrice':0, 'reusPrice':0}]
            // price of reusables / disposables is dictated by these variables 
        };
        this.maxNumStudents = 1000
        this.handleChange = this.handleChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.addDishwasherPrice = this.addDishwasherPrice.bind(this);
    }
    handleChange(evt) {
        this.setState({
          [evt.target.name]: evt.target.value,
          data: [...Array(evt.target.value).keys()]
            .map(x => ({'x':x, 
                        'dispPrice':0.38 * this.state.numStudents * x, 
                        'reusPrice': this.state.numStudents * 5.46 + (0.04 * x * this.state.numStudents) + (this.state.dishwasher * 25000)}))
                        
        });  
    
        // .concat([...Array(this.maxNumStudents - (evt.target.value)).keys()].map(x => ({'x':x, 
        //                             'dispPrice':0, 'reusPrice':0})))

    }
    addDishwasherPrice() {
        let temp = this.state.data

        if (!this.state.dishwasher) {
            for (let i =0; i < this.state.data.length; i++ ) {
                temp[i].reusPrice += 25000
            }
        }
        else {
            for (let i =0; i < this.state.data.length; i++ ) {
                temp[i].reusPrice -= 25000
        }}

        this.setState({
            dishwasher: !this.state.dishwasher,
            data: temp,
         })
         this.forceUpdate();

    }

    handleToggle(evt) {
        // this.setState({ dishwasher: !this.state.dishwasher,
        //                data: [] // this.addDishwasherPrice()
        //             })
        
        this.addDishwasherPrice()

    }
    render() {
        return (
            <div>

                
                    <label htmlFor='dishwasher'> need a dishwasher? ( + 25,000) </label>
                    <input
                        type='checkbox'
                        name='dishwasher'
                        checked={this.state.dishwasher}
                        onChange={this.handleToggle}
                        id='dishwasher'
                    />
                    <h1>
                        reusable price: 
                        {Math.round(this.state.numStudents * 5.46 + (0.04 * this.state.numSchoolDays * this.state.numStudents) 
                        + (this.state.dishwasher * 25000))}
                        $ 
                    </h1>
                    <h1>
                         disposable price:
                         {Math.round(0.38 * this.state.numStudents * this.state.numSchoolDays)}
                         $
                    </h1>
                    <div style={{height: "100px", marginLeft:"100px", width: "1000px"}}>
                        <label htmlFor='numStudents'> number of students : {this.state.numStudents}  </label>
                        <Slider 
                            name='numStudents'
                            id='numStudents'
                            min={0}
                            max={3000} 
                            value={this.state.numStudents}
                            onChange={this.handleChange}
                            aria-label="Default" 
                            valueLabelDisplay="auto" /> 
                    </div>
                    <div style={{height: "100px", marginLeft:"100px", width: "1000px"}}>
                        <label htmlFor='numSchoolDays'> number of school days : {this.state.numSchoolDays} </label>
                        <Slider 
                            name='numSchoolDays'
                            id='numSchoolDays'
                            min={0}
                            max={360} 
                            value={this.state.numSchoolDays}
                            onChange={this.handleChange}
                            aria-label="Default" 
                            valueLabelDisplay="auto" /> 
                    </div>
                    
                        <LineChart key={this.state.dishwasher} width={1000} height={400} data={this.state.data.sort((a,b) => a.x - b.x)}>

                            <XAxis  dataKey="x" type="category" domain={[0, 1000]} ticks={[0, 100, 200, 300, 400, 500, 1000]} />
                            <YAxis/>
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                            <Line dataKey="reusPrice" name="reusable price" stroke="#8884d8" />
                            <Line dataKey="dispPrice" name="disposable price" stroke="#82ca9d" />
                            <Legend  />
                        </LineChart>

                        <BarChart   width={600} 
                                    height={600} 
                                    data={[{name:'disposable', dispprice: 0.38 * this.state.numStudents * this.state.numSchoolDays}, 
                                            {name: 'reusable', price: this.state.numStudents * 5.46 + (0.04 * this.state.numSchoolDays* this.state.numStudents)}]}>
                            <Bar dataKey="price" fill="green" />
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="name" />
                            <YAxis />
                        </BarChart>
                
               
            </div>

        );
    }
}
export default CostDisplay;