import { MillaUser } from '../store/models/milla-user.model';

export function cleanObject(obj) {
  const dummy = Object.assign({}, obj);
  Object.keys(dummy).forEach(
    key =>
      (dummy[key] &&
        typeof dummy[key] === 'object' &&
        cleanObject(dummy[key])) ||
      ((dummy[key] === undefined ||
        dummy[key] === '' ||
        dummy[key] === null ||
        dummy[key] === [] ||
        dummy[key] === {}) &&
        delete dummy[key])
  );
  return dummy;
}

export function formatUserProfileToMillaUser(profile): MillaUser {
  if (isEmptyObject(profile)) {
    if (localStorage.getItem('provider') === 'phone') {
      return { ...profile, ...JSON.parse(localStorage.getItem('user')) };
    } else if (!isEmptyObject(localStorage.getItem('user'))) {
      profile = JSON.parse(localStorage.getItem('user'));
    }
  }
  return cleanObject({
    firstname: profile.given_name || profile.firstname,
    lastname: profile.family_name || profile.lastname,
    email: profile.email,
    language: profile.locale || profile.language,
    phone: profile.phone ? profile.phone : '',
    phone_confirmed: profile.verified_phone
      ? profile.verified_phone
      : profile.phone_confirmed,
    email_confirmed: profile.verified_email || profile.email_confirmed,
    picture_url: profile.picture || profile.picture_url,
    id: profile.id
  });
}

export function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataURI.split(',')[1]);
  } else {
    byteString = decodeURI(dataURI.split(',')[1]);
  }
  // separate out the mime component
  const mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];
  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}

export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
