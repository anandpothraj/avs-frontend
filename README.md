# Anand Vaccination System
![avs](https://github.com/anandpothraj/avs-frontend/assets/75027034/b270079d-5100-436f-b373-532a9eaee2e5)
[AVS](https://anand-vaccination-system.netlify.app/) is a robust MERN stack web app designed for precise disease vaccination with stringent validation to minimize errors. It also includes features like vaccination status tracking, certification issuance, and secure travel facilitation to maintain a safe environment.

## CONTENT
1. TECH STACK.
2. INSTALLATION.
3. OVERVIEW.
4. WORK FLOW.
5. VISUAL REPRESENTATION.

## TECH STACK

<img height="50" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png">&nbsp;&nbsp;
<img height="50" src="https://user-images.githubusercontent.com/25181517/183898054-b3d693d4-dafb-4808-a509-bab54cf5de34.png">&nbsp;&nbsp;
<img height="50" width="100" src="https://axios-http.com/assets/logo.svg" />&nbsp;&nbsp; 
<img height="50" src="https://raw.githubusercontent.com/react-icons/react-icons/master/react-icons.svg">&nbsp;&nbsp;
<img height="50" src="https://github.com/gcoro/react-qrcode-logo/blob/master/res/qrcode-react.png">&nbsp;&nbsp;
<img height="50" src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png">&nbsp;&nbsp;
<img height="50" src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png">&nbsp;&nbsp;
<img height="50" src="https://user-images.githubusercontent.com/25181517/192108374-8da61ba1-99ec-41d7-80b8-fb2f7c0a4948.png">&nbsp;&nbsp;
<img height="50" src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png">

| Technology Name |    Version     |
| :-------------: |:-------------: |
|      React      |    "^18.2.0"   |
|    Bootstrap    |    "^5.2.3"    |
| React Bootstrap |    "^2.7.4"    |
|      Axios      |    "^1.4.0"    |
|   React Icons   |    "^4.9.0"    |
|   React Qrcode  |    "^2.0.12"   |
|   React JWT     |    "^1.1.8"    |

## INSTALLATION

It is recommended to install `node version` >= `14.0.0+` as well as npm accordingly supporting to that node version.

To clone the code inside your local system use :

```
git clone https://github.com/anandpothraj/avs-frontend.git
```

## OVERVIEW
Features include:
- Single step solution for complete vaccination process.
- Consist Two step authenication system for high safety standards.
- Precision with High Validation.
- Doctor-Focused Dashboard.
- User-Friendly Patient Experience.
- Secure Certification.
  
## WORK FLOW
- There are three types of users in AVS :
  - Patient
  - Doctor
  - Inspector
- Features similar for all type of users :
  - Register or Login using two step user authenication system.
  - Edit User Details or User Credentials.
- Patient :
  - Filter and Track Vaccination Status.
  - Book, Fetch, Edit and Delete Appointments.
  - Preview, Email and Download Vaccination Certificate.
- Doctor :
  - Fetch Users and there Appointment details.
  - Add, update, fetch and delete vaccine details.
  - Vaccinate patients and update their vaccination details.
- Inspector :
  - Filter and Track Vaccination Status of patients.
  - Ensuring safe travel facilitation to maintain a safe environment.
 
## VISUAL REPRESENTATION
- Here is a simple flow chart for **Patient Vaccination Process** :
```mermaid
graph TD;
    PATIENT-->LOGIN/REGISTER;
    LOGIN/REGISTER-->PATIENT-DASHBOARD;
    PATIENT-DASHBOARD-->FETCH/BOOK/EDIT/DELETE-APPOINTMENT;
    APPOINTMENT-->VACCINATED;
    VACCINATED-->TRACK/EMAIL/DOWNLOAD-VACCINATION-CERTIFICATE;
```
1. Patient Login, Register.

![image](https://github.com/anandpothraj/avs-frontend/assets/75027034/e45aff70-4266-43e6-aede-c85c2cdea83e)

![image](https://github.com/anandpothraj/avs-frontend/assets/75027034/694b37e5-1ac2-4fff-8ae7-c4f5fc0751b5)

2. Patient Dashboard.

![image](https://github.com/anandpothraj/avs-frontend/assets/75027034/2386bd4c-63e8-47cc-9e60-19add66ff23a)

3. Book, Edit or Delete Appointment.

![image](https://github.com/anandpothraj/avs-frontend/assets/75027034/c2de063a-3b53-4def-889e-0ff0f7200921)

![image](https://github.com/anandpothraj/avs-frontend/assets/75027034/d5b89d29-2204-4545-9c70-39a8268114a4)

![image](https://github.com/anandpothraj/avs-frontend/assets/75027034/0024f9cd-8064-49ab-8baf-aa318b907caf)

4. Fetch, Track, Email, Download Vaccination Certification.

![image](https://github.com/anandpothraj/avs-frontend/assets/75027034/596182b3-b621-4d9e-9ba0-2235e5f822cc)


- Here is a simple flow chart for **Doctor Vaccination Process** :
```mermaid
graph TD;
    DOCTOR-->LOGIN/REGISTER;
    LOGIN/REGISTER-->DOCTOR-DASHBOARD;
    DOCTOR-DASHBOARD-->FETCH-APPOINTMENTS;
    FETCH-APPOINTMENTS-->VACCINATE-PATIENTS;
```
1. Doctor Login, Register.

![image](https://github.com/anandpothraj/avs-frontend/assets/75027034/7634fab1-8757-423b-a5e0-7513e17e16b0)

![image](https://github.com/anandpothraj/avs-frontend/assets/75027034/03ec4c74-d589-4dea-92a7-94587fc8eda5)


2. Doctor Dashboard.

  - Fetch Appointments Dashboard.
    ![image](https://github.com/anandpothraj/avs-frontend/assets/75027034/0d930ea7-7c47-496b-80c1-41b35ae5652a)

  - Vaccines Info Dashboard.
    ![image](https://github.com/anandpothraj/avs-frontend/assets/75027034/7407d8f6-8810-4986-8b23-857962da4cb7)


3. Fetch Appointments.

![image](https://github.com/anandpothraj/avs-frontend/assets/75027034/c5cbe637-4858-4ff6-8add-3bd907582e3e)


4. Vaccinate Patients.

![image](https://github.com/anandpothraj/avs-frontend/assets/75027034/d6d5979c-80ed-44e0-b47c-5737ee6dd1b6)


- Here is a simple flow chart for **Inspector Inspection Process** :
```mermaid
graph TD;
    INSPECTOR-->LOGIN/REGISTER;
    LOGIN/REGISTER-->INSPECTOR-DASHBOARD;
    INSPECTOR-DASHBOARD-->FETCH-VACCINATIONS;
```

1. Inspector Login, Register.

![image](https://github.com/anandpothraj/avs-frontend/assets/75027034/092c5b28-2da6-4737-8020-bb4b900f32ff)

![image](https://github.com/anandpothraj/avs-frontend/assets/75027034/63c72f27-6ecb-457e-9c39-ab77392447b5)

2. Inspector Dashboard.

![image](https://github.com/anandpothraj/avs-frontend/assets/75027034/ac78342f-37bf-400f-9bb3-63d763eb8537)

3. Filter and track vaccination status.

![image](https://github.com/anandpothraj/avs-frontend/assets/75027034/9d3cc236-3d97-4c4c-9af4-d065ec2b3dcf)