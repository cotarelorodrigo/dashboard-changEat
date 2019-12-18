import React, { Component } from "react";
import 'bootstrap-4-grid/css/grid.min.css';
import '@progress/kendo-theme-material/dist/all.css';
import {DonutChart, BarChart, GridContainer, LineChart} from '../../components/Dashboard';
import {donutChartData, barChartQ4Months, barChartMonthlyPercentages, gridData, lineData} from './test_data'
import axios from 'axios';
import * as constants from '../../constants';
import "tabler-react/dist/Tabler.css";
import "./Statics.css"
import { Card, 
        AccountDropdown, 
        Page,
        Grid,
        StatsCard,
        ProgressCard,
        Nav,
        Header
} from "tabler-react";
import { thisExpression } from "@babel/types";

class Statics extends Component {
    constructor(props){
        super(props);

        this.state = {
            tickets: [],
            month_profit: 0,
            users: [],
            Hipocalorica: {"cant": 0, "mov": 0},
            Hipercalorica: {"cant": 0, "mov": 0},
            Vegana: {"cant": 0, "mov": 0},
            Vegetariana: {"cant": 0, "mov": 0},
            Diabetes: {"cant": 0, "mov": 0},
            Hipertension: {"cant": 0, "mov": 0},
            Celiaquia: {"cant": 0, "mov": 0},
        }
    }

    getMonthProfits(){
        const today = new Date();
        let monthProfit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        for (let index = 0; index < this.state.tickets.length; index++) {
            const ticket = this.state.tickets[index]
            const ticket_date = new Date(ticket['data'])
            const ticket_month = ticket_date.getMonth()
            monthProfit[ticket_month - 1] += ticket['total']
        }
        return monthProfit
    }

    getTodayProfits(){
        const today = new Date();
        const today_day = today.getDate()
        let todayProfit = 0
        for (let index = 0; index < this.state.tickets.length; index++) {
            const ticket = this.state.tickets[index]
            const ticket_date = new Date(ticket['date'])
            const ticket_day = ticket_date.getDate()
            if(ticket_day == today_day){
                todayProfit += ticket['comision']
            }
        }
        return todayProfit
    }

    getTicketInfo(){
        let ticket_info = []
        for (let index = this.state.tickets.length-1; index >= 0; index--) {
            const ticket = this.state.tickets[index]
            ticket_info.push(
                {
                    "Fecha":  ticket["date"],
                    "Email": ticket["email"],
                    "Store": ticket["store"],
                    "StoreId": ticket["store_id"],
                    "Productos":  ticket["product_string"],
                    "Total":ticket['total'],
                    "Comision":ticket['comision']
                }
            )
        }
        return ticket_info
    }

    getCantidadDietas(d1=0, d2=0, d3=0, d4=0, d5=0, d6=0, d7=0){
        this.setState( {Hipocalorica: {"cant": 0, "mov": 0}} )
        this.setState( {Hipercalorica: {"cant": 0, "mov": 0}} )
        this.setState( {Vegana: {"cant": 0, "mov": 0}} )
        this.setState( {Vegetariana: {"cant": 0, "mov": 0}} )
        this.setState( {Diabetes: {"cant": 0, "mov": 0}} )
        this.setState( {Hipertension: {"cant": 0, "mov": 0}} )
        this.setState( {Celiaquia: {"cant": 0, "mov": 0}} )

        for (let index = 0; index < this.state.users.length; index++) {
            if("caloricDiet" in this.state.users[index]){
                if("hipocalorica" == this.state.users[index]["caloricDiet"]){
                    this.setState( {Hipocalorica: {"cant": this.state.Hipocalorica["cant"] += 1, "mov": 0}} )
                }
                if("hipercalorica" == this.state.users[index]["caloricDiet"]){
                    this.setState( {Hipercalorica: {"cant": this.state.Hipercalorica["cant"] += 1, "mov": 0}} )
                }
            }

            if("personalDiet" in this.state.users[index]){
                if("vegana" == this.state.users[index]["personalDiet"]){
                    this.setState( {Vegana: {"cant": this.state.Vegana["cant"] += 1, "mov": 0}} )
                }
                if("vegetariana" == this.state.users[index]["personalDiet"]){
                    this.setState( {Vegetariana: {"cant": this.state.Vegetariana["cant"] += 1, "mov": 0}} )
                }
            }

            if("therapeuticDiet" in this.state.users[index]){
                if("diabetes" == this.state.users[index]["therapeuticDiet"]){
                    this.setState( {Diabetes: {"cant": this.state.Diabetes["cant"] += 1, "mov": 0}} )
                }
                if("hipertension" == this.state.users[index]["therapeuticDiet"]){
                    this.setState( {Hipertension: {"cant": this.state.Hipertension["cant"] += 1, "mov": 0}} )
                }
                if("celiaquia" == this.state.users[index]["therapeuticDiet"]){
                    this.setState( {Celiaquia: {"cant": this.state.Celiaquia["cant"] += 1, "mov": 0}} )
                }
            }
        }

        if((d1 == 0)){
            if (this.state.Hipocalorica["cant"] != 0){
                this.setState( {Hipocalorica: {"cant": this.state.Hipocalorica["cant"], "mov": 100}} )
            }
            else{
                this.setState( {Hipocalorica: {"cant": this.state.Hipocalorica["cant"], "mov": 0}} )
            }
        }
        else{
            this.setState( {Hipocalorica: {"cant": this.state.Hipocalorica["cant"], "mov": this.state.Hipocalorica["cant"]*100/d1}} )
        }

        if((d2 == 0)){
            if (this.state.Hipercalorica["cant"] != 0){
                this.setState( {Hipercalorica: {"cant": this.state.Hipercalorica["cant"], "mov": 100}} )
            }
            else{
                this.setState( {Hipercalorica: {"cant": this.state.Hipercalorica["cant"], "mov": 0}} )
            }
        }
        else{
            this.setState( {Hipercalorica: {"cant": this.state.Hipercalorica["cant"], "mov": this.state.Hipercalorica["cant"]*100/d2}} )
        }

        if((d3 == 0)){
            if (this.state.Vegana["cant"] != 0){
                this.setState( {Vegana: {"cant": this.state.Vegana["cant"], "mov": 100}} )
            }
            else{
                this.setState( {Vegana: {"cant": this.state.Vegana["cant"], "mov": 0}} )
            }
        }
        else{
            this.setState( {Vegana: {"cant": this.state.Vegana["cant"], "mov": this.state.Vegana["cant"]*100/d3}} )
        }

        if((d4 == 0)){
            if (this.state.Vegetariana["cant"] != 0){
                this.setState( {Vegetariana: {"cant": this.state.Vegetariana["cant"], "mov": 100}} )
            }
            else{
                this.setState( {Vegetariana: {"cant": this.state.Vegetariana["cant"], "mov": 0.0}} )
            }
        }
        else{
            this.setState( {Vegetariana: {"cant": this.state.Vegetariana["cant"], "mov": this.state.Vegetariana["cant"]*100/d4}} )
        }

        if((d5 == 0)){
            if (this.state.Diabetes["cant"] != 0){
                this.setState( {Diabetes: {"cant": this.state.Diabetes["cant"], "mov": 100}} )
            }
            else{
                this.setState( {Diabetes: {"cant": this.state.Diabetes["cant"], "mov": 0}} )
            }
        }
        else{
            this.setState( {Diabetes: {"cant": this.state.Diabetes["cant"], "mov": this.state.Diabetes["cant"]*100/d5}} )
        }

        if((d6 == 0)){
            if (this.state.Hipertension["cant"] != 0){
                this.setState( {Hipertension: {"cant": this.state.Hipertension["cant"], "mov": 100}} )
            }
            else{
                this.setState( {Hipertension: {"cant": this.state.Hipertension["cant"], "mov": 0}} )
            }
        }
        else{
            this.setState( {Hipertension: {"cant": this.state.Hipertension["cant"], "mov": this.state.Hipertension["cant"]*100/d6}} )
        }

        if((d7 == 0)){
            if (this.state.Celiaquia["cant"] != 0){
                this.setState( {Celiaquia: {"cant": this.state.Celiaquia["cant"], "mov": 100}} )
            }
            else{
                this.setState( {Celiaquia: {"cant": this.state.Celiaquia["cant"], "mov": 0}} )
            }
        }
        else{
            this.setState( {Celiaquia: {"cant": this.state.Celiaquia["cant"], "mov": this.state.Celiaquia["cant"]*100/d7}} )
        }

    }

    getTickets(){
        axios.get(`${constants.IP_WEBSERVICE}/tickets`)
        .then( response => {
            const jsonResponse = response.data;
            this.setState({tickets: jsonResponse})
        }, error => {
            console.log(`error: ${error}`);
        })
    };

    getUsers(){
        axios.get(`${constants.IP_WEBSERVICE}/users`)
        .then( response => {
            const jsonResponse = response.data["data"];
            this.setState({users: jsonResponse})
        }, error => {
            console.log(`error: ${error}`);
        })
    };

    componentDidMount(){
        this.getTickets();
        this.getUsers();
        this.getCantidadDietas()
    }

    componentDidUpdate(prevProps, prevState) {
        //console.log(`New: ${this.state.users.length}`);
        //console.log(`Old: ${prevState.users.length}`);
        //console.log(`Longitud: ${prevState.users.length - this.state.users.length}`);
        if(this.state.tickets.length != prevState.tickets.length){
            this.getTickets()
        }
        if(this.state.users.length != prevState.users.length){
            this.getUsers()
            this.getCantidadDietas(prevState.Hipocalorica["cant"], prevState.Hipercalorica["cant"], prevState.Vegana["cant"], prevState.Vegetariana["cant"],
            prevState.Diabetes["cant"], prevState.Hipertension["cant"], prevState.Celiaquia["cant"])
        }
    }

    render() {
        return (
            this.state.tickets.length
            ?
            //<Nav items={<React.Fragment> <Nav.Item hasSubNav value="Home" icon="globe"> </Nav.Item></React.Fragment>}/>
            <Page.Content>
                <Header.H1 class="header_title">ChangEat - Dashboard</Header.H1>
                <Card class="card_style">
                    <Card.Header >
                        <Card.Title class="title_card">Sales</Card.Title>
                    </Card.Header>
                    <Card.Body className='dashboard_background'>
                        <Grid.Row cards>
                            <Grid.Col>
                                <LineChart data={this.getMonthProfits()} />
                            </Grid.Col> 
                            <Grid.Col wodth={1}>
                                <ProgressCard header="Today profit" content={this.getTodayProfits()} progressColor={this.getTodayProfits()? "green" : "red"} progressWidth={this.getTodayProfits() ? 14 : 1}/>
                                <ProgressCard header="Month profit" content={this.getTodayProfits()} progressColor={this.getTodayProfits()? "yellow" : "red"} progressWidth={this.getTodayProfits() ? 4 : 1}/>
                            </Grid.Col>
                        </Grid.Row>
                        <Grid.Row cards ls={10}>
                            <GridContainer data={this.getTicketInfo()} />
                        </Grid.Row>
                    </Card.Body>
                </Card>
                <Card class="card_style">
                    <Card.Header >
                        <Card.Title class="title_card">Nuevos usuarios</Card.Title>
                    </Card.Header>
                    <Card.Body className='dashboard_background'>
                            <Grid.Row cards={true}>
                                <Grid.Col width={4} sm={4} lg={2}>
                                    <StatsCard layout={1} movement={this.state.Hipercalorica["mov"].toString()} total={this.state.Hipercalorica["cant"].toString()} label="Hipercalorica" />
                                </Grid.Col>
                                <Grid.Col width={4} sm={4} lg={2}>
                                    <StatsCard layout={1} movement={this.state.Hipocalorica["mov"].toString()} total={this.state.Hipocalorica["cant"].toString()} label="Hipocalorica" />
                                </Grid.Col>
                                <Grid.Col width={4} sm={4} lg={2}>
                                    <StatsCard layout={1} movement={this.state.Celiaquia["mov"].toString()} total={this.state.Celiaquia["cant"].toString()} label="Celíaco" />
                                </Grid.Col>
                                <Grid.Col width={4} sm={4} lg={2}>
                                    <StatsCard layout={1} movement={this.state.Diabetes["mov"].toString()} total={this.state.Diabetes["cant"].toString()} label="Diabético" />
                                </Grid.Col>
                                <Grid.Col width={4} sm={4} lg={2}>
                                    <StatsCard layout={1} movement={this.state.Hipertension["mov"].toString()} total={this.state.Hipertension["cant"].toString()} label="Hipertenso" />
                                </Grid.Col>
                                <Grid.Col width={4} sm={4} lg={2}>
                                    <StatsCard layout={1} movement={this.state.Vegana["mov"].toString()} total={this.state.Vegana["cant"].toString()} label="Vegano/Vegetariano" />
                                </Grid.Col>                      
                            </Grid.Row>
                    </Card.Body>
                </Card>     
                <Card class="card_style">
                    <Card.Header >
                        <Card.Title class="title_card">Categories</Card.Title>
                    </Card.Header>
                    <Card.Body className='dashboard_background'>
                        <DonutChart donutChartData={donutChartData} />
                    </Card.Body>
                </Card>
            </Page.Content>
            : null
        );
    }
}


export default Statics;
