import React from 'react';
import style from "./AuthorityRecord.module.css";
import {Button, Col, Row} from "antd";
import {useRouter} from "next/router";


const AuthorityRecord = ({data, type}) => {
  const router = useRouter();

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
    switch (type) {
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

  const onFilter = (value, field) => {
    router.push({
      pathname: '/search',
      query: {[field]: value}
    })
  };

  const onFilterClick = () => {
    switch (type) {
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

  const displayTitle = () => {
    switch (type) {
      case 'people':
        return displayData(data, undefined, 'full_name');
      case 'organisations':
        return displayData(data, undefined, 'name');
      case 'places':
        return displayData(data, undefined, 'place_name');
      case 'events':
        return displayData(data, undefined, 'event')
    default:
        break;
    }
  }

  return (
    <div className={style.RecordWrapper}>
      <Row>
        <Col xs={0} sm={2}/>
        <Col xs={24} sm={20}>
          <div className={style.Title}>
            <h1>
              {displayTitle()}
            </h1>
          </div>
        </Col>
        <Col xs={0} sm={2}/>
      </Row>
      <Row>
        <Col xs={0} sm={2}/>
        <Col xs={24} sm={20}>
          {data && displayFields()}
        </Col>
        <Col xs={0} sm={2}/>
      </Row>
      <Row>
        <Col xs={0} sm={2}/>
        <Col xs={24} sm={20}>
          <div className={style.FilterButton}>
            <Button type="primary" onClick={() => onFilterClick()}>Filter</Button>
          </div>
        </Col>
        <Col xs={0} sm={2}/>
      </Row>
    </div>
  )
};

export default AuthorityRecord;
