import React, { Component } from "react";
import { connect } from 'react-redux'

import Loading from '../cmps/Loading.js'
import Header from '../cmps/Header.js'
import Footer from '../cmps/Footer.js'
import List from '../cmps/List.js'
import { loadGuides } from '../reducers/guide/actionGuide.js'
import Navbar from '../cmps/Navbar.js'
import MobileNavbar from '../cmps/MobileNavbar.js'

class LocalGuideApp extends Component {
    state = {
        cities: ['tel-aviv', 'paris', 'barcelona', 'new-york', 'mexico-city', 'berlin'],
        styleNavBar: {
            backgroundColor: '',
            transition: 'backgroundColor'
        },
        filterBy: { city: '', avgRank: 4, tags: '' },
        isMobileNavbar: true

    }



    componentDidMount() {
        this.props.loadGuides(this.state.filterBy);
        this.resize()
        document.body.style.paddingTop = 0
        window.onscroll = () => {
            let styleNavBar;
            if (document.documentElement.scrollTop > 110) {
                styleNavBar = { backgroundColor: '#537580', transition: ' 0.8s' }
                this.setState({ styleNavBar })
            } else if (document.documentElement.scrollTop < 500)
                styleNavBar = { backgroundColor: '', transition: ' 0.8s' }
            this.setState({ styleNavBar })
        }
        window.addEventListener(('resize'), this.resize)

    }

    componentWillMount() {
        window.removeEventListener(('resize'), this.resize)
        window.onscroll = null
    }
    resize = () => {
        this.setState({ isMobileNavbar: window.innerWidth < 650 ? true : false })
    }

    render() {
        if (this.props.isLoading) {
            return <Loading></Loading>
        }
        return (
            <div>
                {/* <div className="nav-container-header"> */}

                {this.state.isMobileNavbar ?
                    <MobileNavbar styleNavBar={this.state.styleNavBar} /> :
                    <Navbar styleNavBar={this.state.styleNavBar} />


                }
                {/* </div> */}
                <Header ></Header> {
                    this.props.guides &&
                    <section className="main-container">
                        <List guides={this.props.guides} cities={this.state.cities}>
                        </List>
                    </section>
                }
                <Footer ></Footer>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        guides: state.guides.guides,
        user: state.user,
        isLoading: state.system.isLoading,
    }
}

const mapDispatchToProps = {
    loadGuides,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocalGuideApp)