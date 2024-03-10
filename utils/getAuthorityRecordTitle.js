export const getAuthorityRecordTitle = (data, type) => {
    switch (type) {
        case 'people':
        case 'person':
            return data['full_name'];
        case 'organisations':
        case 'organisation':
            return data['name'];
        case 'places':
        case 'place':
            return data['place_name'];
        case 'events':
        case 'event':
            return data['event'];
        default:
            break;
    }
}