import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import MetricCard from './MetricCard'
import {addEntry} from "../actions/index";
import {removeEntry} from "../utils/api";
import {timeToString, getDailyReminderValue} from "../utils/helpers";
import {white} from "../utils/colors";
import TextButton from './TextButton'

class EntryDetail extends Component {
  static navigationOptions = ({navigation}) => {
    const {entryId} = navigation.state.params;

    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    return {
      title: `${day}. ${month}. ${year}`
    }
  };

  reset = () => {
    const {remove, goBack, entryId} = this.props;

    remove();
    goBack();
    // noinspection JSIgnoredPromiseFromCall
    removeEntry(entryId)
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today; // only update if there are metrics and the metrics are ot from today
  }

  render() {

    const {metrics} = this.props;

    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics}/>
        <TextButton onPress={this.reset} style={{margin: 20}}>Reset</TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 16
  }
});


function mapStateToProps(state, {navigation}) {
  // hint navigation comes from the props
  const {entryId} = navigation.state.params;

  return {
    entryId,
    metrics: state[entryId]
  }
}

function mapDispatchToProps(dispatch, {navigation}) {
  const {entryId} = navigation.state.params;

  return {
    remove: () => dispatch(addEntry({
      [entryId]: timeToString() === entryId
        ? getDailyReminderValue()
        : null
    })),
    goBack: () => navigation.goBack()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail)
