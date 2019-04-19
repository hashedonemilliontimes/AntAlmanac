import React from 'react';
import {Paper} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ColorPicker from '../App/colorPicker.js';
import {Delete} from '@material-ui/icons';
import locations from "../CoursePane/locations.json";

const styles = {
  container: {
    padding: '0.5rem',
    minWidth: '15rem'
  },
  title: {
    fontSize: '0.9rem',
    fontWeight: 500
  },
  icon: {
    cursor: 'pointer'
  },
  titleBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: "center"
  },
  table: {
    border: "none",
    width: '100%',
    borderCollapse: "collapse",
    fontSize: '0.9rem'
  },
  alignToTop: {
    verticalAlign: 'top'
  },
  rightCells: {
    textAlign: 'right'
  },
  multiline: {
    whiteSpace: 'pre'
  },
  colorPicker: {
    float: 'right',
    cursor: 'pointer',
    '& > div': {
      height: '1.5rem',
      width: '1.5rem',
      borderRadius: '50%'
    }
  }
};

const genMapLink = location => {
  try {
    const location_id = locations[location.split(" ")[0]];
    return "https://map.uci.edu/?id=463#!m/" + location_id;
  } catch (err) {
    return "https://map.uci.edu/?id=463#!ct/12035,12033,11888,0,12034";
  }
};

const CourseCalendarEvent = (props) => {
  const {classes, courseInMoreInfo} = props;
  const {section, name, final, location} = courseInMoreInfo;

  return (
    <div>
      <Paper className={classes.container}>
        <div className={classes.titleBar}>
          <span className={classes.title}>{name[2]}</span>
          <Delete className={classes.icon} onClick={props.onClassDelete} />
        </div>
        <table className={classes.table}>
          <tbody>
          <tr>
            <td className={classes.alignToTop}>Instructors</td>
            <td className={classes.multiline + " " + classes.rightCells}>{section.instructors.join("\n")}</td>
          </tr>
          <tr>
            <td className={classes.alignToTop}>Location</td>
            <td className={classes.multiline + " " + classes.rightCells}>
              {(location !== "TBA") ? (
                  <a href={genMapLink(location)} target="_blank">{location}</a>
                ) : (location)
              }
            </td>
          </tr>
          <tr>
            <td>Final</td>
            <td className={classes.rightCells}>{final}</td>
          </tr>
          <tr>
            <td>Color</td>
            <td className={classes.colorPicker}><ColorPicker event={courseInMoreInfo} onColorChange={props.onColorChange}/></td>
          </tr>
          </tbody>
        </table>
      </Paper>
    </div>
  );
};

CourseCalendarEvent.propTypes = {
  courseInMoreInfo: PropTypes.object.isRequired,
  onClassDelete: PropTypes.func.isRequired,
  onColorChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(CourseCalendarEvent);
