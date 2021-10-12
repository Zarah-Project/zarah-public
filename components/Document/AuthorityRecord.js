import React from 'react';
import style from "./AuthorityRecord.module.css";
import {Button, Col, Row} from "antd";
import useSWR from "swr";
import {API, fetcher} from "../../utils/api";

const AuthorityRecord = ({record, onFilter}) => {
  const { data, error } = useSWR(record ? `${API}/${record.recordType}/${record.id}/` : null, fetcher);

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
            {data.map(n => (<div>{n}</div>))}
          </dd>
        </dl>
      </div>
    )
  };

  const displayPersonFields = () => {
    const getNames = () => {
      const names = data['other_names'];
      const fullNames = names.map(name => `${name['last_name']}, ${name['first_name']}`);
      return displayOtherFormsOfNames(fullNames);
    };

    return (
      <React.Fragment>
        {displayData(data, 'Name', 'full_name')}
        {displayData(data, 'Notes', 'notes', true)}
        {data['other_names'].length > 0 && getNames()}
      </React.Fragment>
    )
  };

  const displayOrganisationFields = () => {
    return (
      <React.Fragment>
        {displayData(data, 'Name', 'name')}
        {displayData(data, 'Acronym', 'acronym')}
        {displayData(data, 'Organization form', 'organisation_form')}
        {displayData(data, 'Organization form (text)', 'organisation_form_text')}
        {displayData(data, 'Organization form scale', 'organisation_form_scale')}
        {displayData(data, 'Organization form scale (text)', 'organisation_form_scale_text')}
        {displayData(data, 'Gendered membership', 'organisation_gendered_membership')}
        {displayData(data, 'Gendered membership (text)', 'organisation_gendered_membership_text')}
        {displayData(data, 'Notes', 'notes', true)}
      </React.Fragment>
    )
  };

  const displayPlaceFields = () => {
    const getNames = () => {
      const names = data['other_names'];
      const placeNames = names.map(name => `${name['place_name']}`);
      return displayOtherFormsOfNames(placeNames);
    };

    return (
      <React.Fragment>
        {displayData(data, 'Place', 'place_name')}
        {displayData(data, 'Country', 'country')}
        {data['other_names'].length > 0 && getNames()}
      </React.Fragment>
    )
  };

  const displayEvents = () => {
    return (
      <React.Fragment>
        {displayData(data, 'Event', 'event')}
        {displayData(data, 'Date', 'date')}
        {displayData(data, 'Notes', 'notes', true)}
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

  const onFilterClick = () => {
    switch (record['field']) {
      case 'people':
        onFilter(data['full_name'], 'person');
        break;
      case 'organisations':
        onFilter(data['full_name'], 'organisation');
        break;
      case 'places':
        onFilter(data['place_full'], 'place');
        break;
      case 'events':
        onFilter(data['event_full'], 'event');
        break;
      default:
        break;
    }
  };

  return (
    <div className={style.RecordWrapper}>
      <Row>
        <Col xs={24}>
          {data && displayFields()}
        </Col>
        <Col xs={24}>
          <div className={style.FilterButton}>
            <Button type="primary" onClick={() => onFilterClick()}>Filter</Button>
          </div>
        </Col>
      </Row>
    </div>
  )
};

export default AuthorityRecord;
