import React from 'react';
import style from "./AuthorityRecord.module.css";
import {Button, Col, Row} from "antd";

const AuthorityRecord = ({record}) => {
  const displayData = (data={}, label, field, html) => {
    if (data.hasOwnProperty(field)) {
      if (data[field] !== "" && data[field] !== null) {
        return (
          <dl>
            <dt>{label}</dt>
            <dd>
              {html ? <div dangerouslySetInnerHTML={{ __html: data[field]}}/> : data[field]}
            </dd>
          </dl>
        )
      }
    }
  };

  const displayOtherFormsOfNames = (data) => {
    return (
      <div className={style.OtherForms}>
        <dl>
          <dt>Other forms of name</dt>
          <dd>
            {data.map((n) => (n))}<br/>
          </dd>
        </dl>
      </div>
    )
  };

  const displayPersonFields = () => {
    const getNames = () => {
      const names = record['record']['other_names'];
      const fullNames = names.map(name => `${name['last_name']}, ${name['first_name']}`);
      return displayOtherFormsOfNames(fullNames);
    };

    return (
      <React.Fragment>
        {displayData(record['record'], 'Name', 'full_name')}
        {displayData(record['record'], 'Notes', 'notes')}
        {record['record']['other_names'].length > 0 && getNames()}
      </React.Fragment>
    )
  };

  const displayOrganisationFields = () => {
    return (
      <React.Fragment>
        {displayData(record['record'], 'Name', 'name')}
        {displayData(record['record'], 'Acronym', 'acronym')}
        {displayData(record['record'], 'Organization form', 'organisation_form')}
        {displayData(record['record'], 'Organization form (text)', 'organisation_form_text')}
        {displayData(record['record'], 'Organization form scale', 'organisation_form_scale')}
        {displayData(record['record'], 'Organization form scale (text)', 'organisation_form_scale_text')}
        {displayData(record['record'], 'Gendered membership', 'organisation_gendered_membership')}
        {displayData(record['record'], 'Gendered membership (text)', 'organisation_gendered_membership_text')}
        {displayData(record['record'], 'Notes', 'notes', true)}
      </React.Fragment>
    )
  };

  const displayPlaceFields = () => {
    const getNames = () => {
      const names = record['record']['other_names'];
      const placeNames = names.map(name => `${name['place_name']}`);
      return displayOtherFormsOfNames(placeNames);
    };

    return (
      <React.Fragment>
        {displayData(record['record'], 'Place', 'place_name')}
        {displayData(record['record'], 'Country', 'country')}
        {displayData(record['record'], 'Notes', 'notes')}
        {record['record']['other_names'].length > 0 && getNames()}
      </React.Fragment>
    )
  };

  const displayEvents = () => {
    return (
      <React.Fragment>
        {displayData(record['record'], 'Event', 'event')}
        {displayData(record['record'], 'Date', 'date')}
        {displayData(record['record'], 'Notes', 'notes')}
      </React.Fragment>
    )
  };

  const displayFields = () => {
    switch (record['field']) {
      case 'people':
        return displayPersonFields();
      case 'organisations':
        return displayOrganisationFields();
      case 'places':
        return displayPlaceFields();
      case 'events':
        return displayEvents();
      default:
        break;
    }
  };


  return (
    <div className={style.RecordWrapper}>
      <Row>
        <Col xs={24}>
          {displayFields()}
        </Col>
        <Col xs={24}>
          <div className={style.FilterButton}>
            <Button type="primary">Filter</Button>
          </div>
        </Col>
      </Row>
    </div>
  )
};

export default AuthorityRecord;
