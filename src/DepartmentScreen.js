import React from 'react';
import {Layout, List, ListItem, Text, Select, TopNavigation, Divider, TopNavigationAction, Icon} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import settings from "../config";

const BackIcon = (style) => (
    <Icon {...style} name='arrow-back' />
);

class DepartmentScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {results: [], campusList: [], campus: null, collegeList: [], college: null};
        this.handleBack = this.handleBack.bind(this);
        this.handleSelectCampus = this.handleSelectCampus.bind(this);
        this.handleSelectCollege = this.handleSelectCollege.bind(this);
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

    // handleSelectCollege - handle college selection from dropdown list
    handleSelectCollege(e) {
        this.setState({college: e});
        this.loadDepartments(e);
    }

    // filterCollege - filter original SWS college list into dropdown list format of text and key
    filterCollege(campusShortName) {
        let collegeList = new Array();
        const sourceList = this.props.route.params.colleges.Colleges;
        for (let i in sourceList) {
            if (sourceList[i].CampusShortName.toUpperCase() === campusShortName.toUpperCase()) {
                collegeList.push({text: sourceList[i].CollegeName, key: sourceList[i].CollegeAbbreviation});
            }
        }
        let college = null;
        if (collegeList.length === 1) {
           college = collegeList[0];
           this.loadDepartments(college);
        }
        else {
            this.setState({results: []});
        }
        this.setState({collegeList: collegeList, college: college});
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

    // loadDepartments - call web service to return departments unique to current college selection
    loadDepartments(college) {

        // Initialize call to a web service. The config.json file contains default settings for
        // this application to use rather than hard-code these into component source files.
        let url = settings.sws.baseURL + "/student/v5/department.json?college_abbreviation=" + college.key;
        // Add a header containing a custom header used by the proxy to authenticate this call
        let requestInit = {
            headers: {
                'Application-Id': settings.sws.applicationID
            },
        };

        // Call SWS web service and process results using promises that handle the asynchronous
        // aspects of the call-- that is the code waits on the previous code as completed through
        // the "then" phrases. Note that "fetch" makes the AJAX call to the web service.
        fetch(url, requestInit)
            .then(res => res.json())
            .then((data) => {
                // Update the state of this component so that the data retrieved will be rendered
                data.Departments.sort((a,b) => {return a.DepartmentFullName.localeCompare(b.DepartmentFullName)});
                this.setState({ results: data.Departments});
            })
            .catch((error) => {
                console.log(error);
            });

    }


    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation title="Departments" alignmment="center" leftControl={this.renderNavigateBack()} />
                <Divider/>
                <Layout style={{flex: 1, padding: 20}}>
                    <Text category='h1'>Departments</Text>
                    <Select data={this.state.campusList} selectedOption={this.state.campus}
                            onSelect={this.handleSelectCampus} placeholder={"Select Campus"}/>
                    <Select data={this.state.collegeList} selectedOption={this.state.college}
                            onSelect={this.handleSelectCollege} placeholder={"Select College"}/>
                    <List data={this.state.results}
                          renderItem={({item,index}) => {
                              return (
                                  <ListItem title={item.DepartmentFullName}/>
                              )
                          }}/>
                </Layout>
            </SafeAreaView>
        );
    }
}

export default DepartmentScreen;
