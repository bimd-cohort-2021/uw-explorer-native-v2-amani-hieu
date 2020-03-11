import React from 'react';
import {Layout, List, ListItem, Text, Select, TopNavigation, Divider, TopNavigationAction, Icon} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import settings from "../config";

const BackIcon = (style) => (
    <Icon {...style} name='arrow-back' />
);

class CollegeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {campusList: [], campus: null, collegeList: []};
        this.handleBack = this.handleBack.bind(this);
        this.handleSelectCampus = this.handleSelectCampus.bind(this);
    }

    // handleBack - handle click of back arrow in top navigation
    handleBack() {
        this.props.navigation.goBack();
    }

    // renderNavigateBack - render backarrow in top navigation
    renderNavigateBack() {
        return (
            <TopNavigationAction icon={BackIcon} onPress={this.handleBack}/>
        );
    }

    // handleSelectCampus - handle campus selection from dropdown list
    handleSelectCampus(e) {
        this.setState({campus: e});
        this.filterCollege(e.key);
    }

    // filterCollege - filter original SWS college list into dropdown list format of text and key
    filterCollege(campusShortName) {
        let collegeList = new Array();
        const sourceList = this.props.route.params.colleges.Colleges;
        for (let i in sourceList) {
            if (sourceList[i].CampusShortName.toUpperCase() === campusShortName.toUpperCase()) {
                collegeList.push(sourceList[i]);
            }
        }
        this.setState({collegeList: collegeList});
    }

    componentDidMount() {
        this.loadCampuses();
    }

    // loadCampuses - convert original SWS Campus List to dropdown list format of text and key
    loadCampuses() {
        let campusList = new Array();
        let sourceList = this.props.route.params.campuses.Campuses;
        for (let i in sourceList) {
            campusList.push({text: sourceList[i].CampusName, key: sourceList[i].CampusShortName });
        }
        this.setState({campusList: campusList, campus: {text: null}, collegeList: [],});
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation title="Colleges" alignmment="center" leftControl={this.renderNavigateBack()} />
                <Divider/>
                <Layout style={{flex: 1, padding: 20}}>
                    <Text category='h1'>Colleges for a Campus</Text>
                    <Select data={this.state.campusList} selectedOption={this.state.campus}
                            onSelect={this.handleSelectCampus} placeholder={"Select Campus"}/>
                    <List data={this.state.collegeList}
                          renderItem={({item,index}) => {
                              return (
                                  <ListItem title={item.CollegeName}/>
                              )
                          }}/>
                </Layout>
            </SafeAreaView>
        );
    }
}

export default CollegeScreen;
