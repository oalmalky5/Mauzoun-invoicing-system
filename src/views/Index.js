/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import {useState} from "react";
// node.js library that concatenates classes (strings)
// import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
// import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {

    Container,
    Row,
    Col, Button,
} from "reactstrap";

// core components
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import { useTranslation } from 'react-i18next'



const Index = (props) => {
    const [activeNav, setActiveNav] = useState(1);
    const [chartExample1Data, setChartExample1Data] = useState("data1");

    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }

    const toggleNavs = (e, index) => {
        e.preventDefault();
        setActiveNav(index);
        setChartExample1Data("data" + index);
    };

    const {t} = useTranslation();





    return (
        <>
            <Header/>
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="mb-5 mb-xl-0" xl="8">
                        {/*<nav style={{width: '100%', padding: '2rem 0'}}>*/}
                        {/*    <Button onClick={() => handleClick('en')}>*/}
                        {/*        English*/}
                        {/*    </Button>*/}
                        {/*    <Button onClick={() => handleClick('ar')}>*/}
                        {/*        Arabic*/}
                        {/*    </Button>*/}
                        {/*</nav>*/}
                        <h1>{t("welcome_message")}</h1>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Index;
