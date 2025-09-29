// Global Variables
let currentRole = null;
let selectedRole = null;

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const loginPage = document.getElementById('loginPage');
const dashboardPage = document.getElementById('dashboardPage');
const loginForm = document.getElementById('loginForm');
const statsGrid = document.getElementById('statsGrid');
const quickActions = document.getElementById('quickActions');
const servicesGrid = document.getElementById('servicesGrid');
const dashboardTitle = document.getElementById('dashboardTitle');
const dashboardSubtitle = document.getElementById('dashboardSubtitle');
const dashboardOdiaText = document.getElementById('dashboardOdiaText');
const roleBadge = document.getElementById('roleBadge');
const userName = document.getElementById('userName');
const userRole = document.getElementById('userRole');
const userId = document.getElementById('userId');
const userAvatar = document.getElementById('userAvatar');
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalTitleOdia = document.getElementById('modalTitleOdia');
const modalBody = document.getElementById('modalBody');

// Enhanced Sample Data for all roles
const roleConfigs = {
    student: {
        name: 'ରବି କୁମାର ପଟେଲ',
        nameEng: 'Ravi Kumar Patel',
        title: 'Student Dashboard',
        titleOdia: 'ଛାତ୍ର ଡ୍ୟାସବୋର୍ଡ',
        subtitle: 'Class 10-A, Roll: 15, Kalinga Institute of Technology',
        userID: 'STU2024001',
        roleBadge: 'Active Student',
        credentials: { email: 'student@example.com', password: 'student123' },
        stats: [
            { icon: '📚', label: 'Current Grade', value: 'A-', change: '+5%', type: 'positive' },
            { icon: '✅', label: 'Attendance', value: '92%', change: '+3%', type: 'positive' },
            { icon: '📝', label: 'Assignments', value: '8/10', change: '+2', type: 'positive' },
            { icon: '🏆', label: 'Class Rank', value: '5th', change: '+2', type: 'positive' }
        ],
        quickActions: [
            { icon: '📖', text: 'View Assignments', textOdia: 'କାର୍ଯ୍ୟ ଦେଖନ୍ତୁ', action: 'viewAssignments' },
            { icon: '📊', text: 'Check Results', textOdia: 'ଫଳାଫଳ ଦେଖନ୍ତୁ', action: 'checkResults' },
            { icon: '📅', text: 'Time Table', textOdia: 'ସମୟ ସାରଣୀ', action: 'viewTimetable' },
            { icon: '💬', text: 'Ask Teacher', textOdia: 'ଶିକ୍ଷକଙ୍କୁ ପଚାରନ୍ତୁ', action: 'askTeacher' },
            { icon: '📚', text: 'Study Materials', textOdia: 'ଅଧ୍ୟୟନ ସାମଗ୍ରୀ', action: 'studyMaterials' },
            { icon: '🎯', text: 'Mock Tests', textOdia: 'ମକ ପରୀକ୍ଷା', action: 'mockTests' }
        ],
        services: [
            { icon: '📚', title: 'Digital Library', titleOdia: 'ଡିଜିଟାଲ ଲାଇବ୍ରେରୀ', description: 'Access 10,000+ books and study materials in Odia and English' },
            { icon: '🎯', title: 'Mock Tests', titleOdia: 'ମକ ପରୀକ୍ଷା', description: 'Practice tests for Class 10 board exam preparation' },
            { icon: '🏆', title: 'Achievement Tracker', titleOdia: 'ସଫଳତା ଟ୍ରାକର', description: 'Track your academic progress and awards' }
        ]
    },
    parent: {
        name: 'ରମେଶ କୁମାର ପଟେଲ',
        nameEng: 'Ramesh Kumar Patel',
        title: 'Parent Portal',
        titleOdia: 'ପିତାମାତା ପୋର୍ଟାଲ',
        subtitle: 'Monitoring child: Ravi Kumar Patel (Class 10-A)',
        userID: 'PAR2024050',
        roleBadge: 'Active Parent',
        credentials: { email: 'parent@example.com', password: 'parent123' },
        stats: [
            { icon: '🧒', label: 'Child Enrollment', value: '1', change: 'Ravi K. P.', type: 'neutral' },
            { icon: '📜', label: 'Avg. Grade', value: 'B+', change: '+2%', type: 'positive' },
            { icon: '⚠️', label: 'Pending Fees', value: '₹5,000', change: 'Due: 15 Oct', type: 'negative' },
            { icon: '📅', label: 'Next PTM', value: '20 Oct', change: '8:00 AM', type: 'info' }
        ],
        quickActions: [
            { icon: '💸', text: 'Pay Fees', textOdia: 'ଫିସ୍ ପୈଠ କରନ୍ତୁ', action: 'payFees' },
            { icon: '📞', text: 'Contact Teacher', textOdia: 'ଶିକ୍ଷକଙ୍କୁ ଯୋଗାଯୋଗ', action: 'contactTeacher' },
            { icon: '📅', text: 'View Calendar', textOdia: 'କ୍ୟାଲେଣ୍ଡର ଦେଖନ୍ତୁ', action: 'viewCalendar' },
            { icon: '📈', text: 'Child Progress', textOdia: 'ସନ୍ତାନ ପ୍ରଗତି', action: 'childProgress' }
        ],
        services: [
            { icon: '🛡️', title: 'Safety Monitoring', titleOdia: 'ନିରାପତ୍ତା ତଦାରଖ', description: 'Track bus location and school entry/exit' },
            { icon: '📰', title: 'School Notices', titleOdia: 'ବିଦ୍ୟାଳୟ ସୂଚନା', description: 'Get immediate notifications on circulars and events' },
            { icon: '📊', title: 'Child Performance Report', titleOdia: 'ସନ୍ତାନ କାର୍ଯ୍ୟଦକ୍ଷତା ରିପୋର୍ଟ', description: 'Detailed analytics on your child\'s academic performance' }
        ]
    },
    teacher: {
        name: 'ସୁଶ୍ରୀ ଅଞ୍ଜଳି ଦାସ',
        nameEng: 'Susri Anjali Das',
        title: 'Teacher’s Dashboard',
        titleOdia: 'ଶିକ୍ଷକ ଡ୍ୟାସବୋର୍ଡ',
        subtitle: 'Class Teacher: 10-A, Subject: Mathematics',
        userID: 'TCH2019012',
        roleBadge: 'Active Teacher',
        credentials: { email: 'teacher@example.com', password: 'teacher123' },
        stats: [
            { icon: '👨‍🎓', label: 'Total Students', value: '45', change: 'Class 10-A', type: 'neutral' },
            { icon: ' absen', label: 'Avg. Attendance', value: '95%', change: 'Low Absenteeism', type: 'positive' },
            { icon: '📝', label: 'Pending Grading', value: '15', change: 'Math Test', type: 'negative' },
            { icon: '📅', label: 'Next Lesson', value: 'Trigonometry', change: '4:00 PM', type: 'info' }
        ],
        quickActions: [
            { icon: '✅', text: 'Mark Attendance', textOdia: 'ଉପସ୍ଥାନ ଦିଅନ୍ତୁ', action: 'markAttendance' },
            { icon: '📝', text: 'Submit Grades', textOdia: 'ମାର୍କ ଦିଅନ୍ତୁ', action: 'submitGrades' },
            { icon: '📣', text: 'Send Circular', textOdia: 'ସର୍କୁଲାର ପଠାନ୍ତୁ', action: 'sendCircular' },
            { icon: '📜', text: 'Syllabus Tracker', textOdia: 'ପାଠ୍ୟକ୍ରମ ଟ୍ରାକର', action: 'syllabusTracker' }
        ],
        services: [
            { icon: '👥', title: 'Student Roster Management', titleOdia: 'ଛାତ୍ର ତାଲିକା ପରିଚାଳନା', description: 'Manage student details, enrollment, and transfers' },
            { icon: '🖥️', title: 'e-Content Development', titleOdia: 'ଇ-ବିଷୟବସ୍ତୁ ବିକାଶ', description: 'Upload and manage digital lesson plans and videos' },
            { icon: '📞', title: 'Parent Communication', titleOdia: 'ଅଭିଭାବକ ଯୋଗାଯୋଗ', description: 'Direct messaging platform for parents and students' }
        ]
    },
    headmaster: {
        name: 'ଡଃ. ବିଜୟ ମହାନ୍ତି',
        nameEng: 'Dr. Bijay Mohanty',
        title: 'Headmaster Portal',
        titleOdia: 'ପ୍ରଧାନ ଶିକ୍ଷକ ପୋର୍ଟାଲ',
        subtitle: 'Kalinga Institute of Technology, Bhubaneswar',
        userID: 'HM1998005',
        roleBadge: 'School Administrator',
        credentials: { email: 'headmaster@example.com', password: 'head123' },
        stats: [
            { icon: '🏫', label: 'Total Staff', value: '45', change: '+2 since last yr', type: 'positive' },
            { icon: '🧑‍🤝‍🧑', label: 'Total Students', value: '1200', change: '+50 this year', type: 'positive' },
            { icon: '💰', label: 'Budget Utilized', value: '85%', change: 'On Track', type: 'positive' },
            { icon: '🛠️', label: 'Maintenance Issues', value: '3', change: 'High Priority', type: 'negative' }
        ],
        quickActions: [
            { icon: '📝', text: 'Approve Leave', textOdia: 'ଛୁଟି ଅନୁମୋଦନ', action: 'approveLeave' },
            { icon: '📊', text: 'School Report Card', textOdia: 'ବିଦ୍ୟାଳୟ ରିପୋର୍ଟ', action: 'schoolReport' },
            { icon: '🏢', text: 'Staff Management', textOdia: 'କର୍ମଚାରୀ ପରିଚାଳନା', action: 'staffManagement' },
            { icon: '💸', text: 'Budget Review', textOdia: 'ବଜେଟ୍ ସମୀକ୍ଷା', action: 'budgetReview' }
        ],
        services: [
            { icon: '📜', title: 'School Accreditation', titleOdia: 'ବିଦ୍ୟାଳୟ ମାନ୍ୟତା', description: 'Tools for annual inspection and accreditation submission' },
            { icon: '💰', title: 'Financial Management', titleOdia: 'ଆର୍ଥିକ ପରିଚାଳନା', description: 'Handle school budget, grants, and expenditure reports' },
            { icon: '🛡️', title: 'Infrastructure Audit', titleOdia: 'ଅବକାଠି ଅଡିଟ', description: 'Schedule and manage facility maintenance and audits' }
        ]
    },
    block_officer: {
        name: 'ଇଂ. ସୁନୀଲ ସାହୁ',
        nameEng: 'Eng. Sunil Sahoo',
        title: 'Block Education Officer Portal',
        titleOdia: 'ବ୍ଲକ ଶିକ୍ଷା ଅଧିକାରୀ ପୋର୍ଟାଲ',
        subtitle: 'BEO, Bhubaneswar Block I',
        userID: 'BEO2022010',
        roleBadge: 'Block Officer',
        credentials: { email: 'beo@odgov.in', password: 'block123' },
        stats: [
            { icon: '🏫', label: 'Total Schools', value: '150', change: '50 Primary, 100 Sec.', type: 'neutral' },
            { icon: '✅', label: 'Report Compliance', value: '95%', change: '+5% last qtr', type: 'positive' },
            { icon: '⚠️', label: 'Pending Inspections', value: '12', change: 'Overdue: 2', type: 'negative' },
            { icon: '👥', label: 'Student Count', value: '50,000', change: '+1200 this yr', type: 'positive' }
        ],
        quickActions: [
            { icon: '📜', text: 'Generate Block Report', textOdia: 'ବ୍ଲକ ରିପୋର୍ଟ ପ୍ରସ୍ତୁତ', action: 'generateBlockReport' },
            { icon: '📝', text: 'Schedule Inspection', textOdia: 'ପରୀକ୍ଷା ସୂଚୀ', action: 'scheduleInspection' },
            { icon: '📣', text: 'Issue Block Circular', textOdia: 'ବ୍ଲକ ସର୍କୁଲାର', action: 'issueBlockCircular' },
            { icon: '💰', text: 'Fund Disbursement', textOdia: 'ପାଣ୍ଠି ବଣ୍ଟନ', action: 'fundDisbursement' }
        ],
        services: [
            { icon: '📋', title: 'School Audit Management', titleOdia: 'ବିଦ୍ୟାଳୟ ଅଡିଟ୍ ପରିଚାଳନା', description: 'Monitor and approve school audit reports within the block' },
            { icon: '📊', title: 'Data Aggregation', titleOdia: 'ଡାଟା ସଂଗ୍ରହ', description: 'Consolidate student and teacher data across all block schools' },
            { icon: '🗺️', title: 'Geo-Tagging Schools', titleOdia: 'ବିଦ୍ୟାଳୟ ଜିଓ-ଟ୍ୟାଗିଂ', description: 'Verify and update the geographical location of all schools' }
        ]
    },
    district_officer: {
        name: 'ଆଇ.ଏ.ଏସ୍ ଶ୍ରୀମତୀ ଦେବୀ ପ୍ରସାଦ',
        nameEng: 'IAS Smt. Devi Prasad',
        title: 'District Education Officer Portal',
        titleOdia: 'ଜିଲ୍ଲା ଶିକ୍ଷା ଅଧିକାରୀ ପୋର୍ଟାଲ',
        subtitle: 'DEO, Khordha District',
        userID: 'DEO2018001',
        roleBadge: 'District Authority',
        credentials: { email: 'deo@odgov.in', password: 'district123' },
        stats: [
            { icon: '🏢', label: 'Total Blocks', value: '10', change: '2,000 Schools Total', type: 'neutral' },
            { icon: '📜', label: 'Literacy Rate', value: '85%', change: '+3% last yr', type: 'positive' },
            { icon: '⚠️', label: 'Vacancies (Teacher)', value: '150', change: 'High Priority', type: 'negative' },
            { icon: '🛠️', label: 'Pending Schemes', value: '5', change: 'Mid-Day Meal', type: 'negative' }
        ],
        quickActions: [
            { icon: '📝', text: 'Approve Teacher Transfer', textOdia: 'ଶିକ୍ଷକ ସ୍ଥାନାନ୍ତର ଅନୁମୋଦନ', action: 'approveTransfer' },
            { icon: '📜', text: 'District Policy Update', textOdia: 'ଜିଲ୍ଲା ନୀତି ଅପଡେଟ୍', action: 'policyUpdate' },
            { icon: '💰', text: 'Review District Budget', textOdia: 'ଜିଲ୍ଲା ବଜେଟ୍ ସମୀକ୍ଷା', action: 'reviewBudget' },
            { icon: '📣', text: 'Issue State Report', textOdia: 'ରାଜ୍ୟ ରିପୋର୍ଟ ପ୍ରଦାନ', action: 'issueStateReport' }
        ],
        services: [
            { icon: '⚙️', title: 'System Administration', titleOdia: 'ସିଷ୍ଟମ ପ୍ରଶାସନ', description: 'User management, role assignment, and access control for the district' },
            { icon: '🌐', title: 'Inter-Block Coordination', titleOdia: 'ଆନ୍ତଃ-ବ୍ଲକ ସମନ୍ୱୟ', description: 'Coordinate resources, teachers, and schemes between blocks' },
            { icon: '🛠️', title: 'Scheme Monitoring', titleOdia: 'ଯୋଜନା ତଦାରଖ', description: 'Track the implementation and progress of state and central schemes' }
        ]
    },
    divisional_officer: {
        name: 'ଶ୍ରୀ. ପ୍ରବୋଧ କୁମାର',
        nameEng: 'Sri. Prabodh Kumar',
        title: 'Divisional Commissioner Portal',
        titleOdia: 'ବିଭାଗୀୟ କମିଶନର ପୋର୍ଟାଲ',
        subtitle: 'Central Division, Odisha',
        userID: 'DIVC1995001',
        roleBadge: 'Division Head',
        credentials: { email: 'commissioner@odgov.in', password: 'division123' },
        stats: [
            { icon: '🏛️', label: 'Total Districts', value: '10', change: '100 Blocks Total', type: 'neutral' },
            { icon: '🏆', label: 'Avg. Pass Rate', value: '92%', change: '+1% last yr', type: 'positive' },
            { icon: '🚨', label: 'Critical Issues', value: '2', change: 'Cyclone preparedness', type: 'negative' },
            { icon: '📜', label: 'Policy Implementation', value: '90%', change: 'Excellent', type: 'positive' }
        ],
        quickActions: [
            { icon: '🚨', text: 'Review Disaster Plan', textOdia: 'ବିପର୍ଯ୍ୟୟ ଯୋଜନା ସମୀକ୍ଷା', action: 'reviewDisaster' },
            { icon: '📝', text: 'Set Policy Directives', textOdia: 'ନୀତି ନିର୍ଦ୍ଦେଶାବଳୀ ସ୍ଥିର', action: 'setDirectives' },
            { icon: '📊', text: 'View Divisional Metrics', textOdia: 'ବିଭାଗୀୟ ମେଟ୍ରିକ୍ସ', action: 'viewMetrics' },
            { icon: '💰', text: 'Allocate Emergency Funds', textOdia: 'ଜରୁରୀକାଳୀନ ପାଣ୍ଠି ବଣ୍ଟନ', action: 'allocateFunds' }
        ],
        services: [
            { icon: '👑', title: 'Apex Policy Control', titleOdia: 'ଶୀର୍ଷ ନୀତି ନିୟନ୍ତ୍ରଣ', description: 'Set high-level policy guidelines and oversight for all districts' },
            { icon: '🚨', title: 'Disaster and Crisis Management', titleOdia: 'ବିପର୍ଯ୍ୟୟ ଓ ସଙ୍କଟ ପରିଚାଳନା', description: 'Tools for emergency coordination and response for the entire division' },
            { icon: '📈', title: 'Strategic Planning', titleOdia: 'ରଣନୀତିକ ଯୋଜନା', description: 'Long-term planning and goal setting for educational excellence' }
        ]
    }
};

// Modal Content Templates
const modalContentTemplates = {
    viewAssignments: (roleConfig) => `
        <h4>Assignment List for ${roleConfig.nameEng}</h4>
        <p class="cultural-text">ସମସ୍ତ କାର୍ଯ୍ୟସୂଚୀ</p>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Topic</th>
                    <th>Due Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Mathematics</td>
                    <td>Trigonometry Worksheet</td>
                    <td>2024-10-10</td>
                    <td><span class="status-badge submitted">Submitted</span></td>
                </tr>
                <tr>
                    <td>Science</td>
                    <td>Chemical Reactions Lab Report</td>
                    <td>2024-10-15</td>
                    <td><span class="status-badge pending">Pending</span></td>
                </tr>
                <tr>
                    <td>Odia</td>
                    <td>Essay on Odia Culture</td>
                    <td>2024-10-25</td>
                    <td><span class="status-badge pending">Pending</span></td>
                </tr>
            </tbody>
        </table>
        <div class="action-buttons">
            <button class="btn btn-primary" onclick="alert('Navigating to Assignment Submission...')">Submit New Assignment</button>
        </div>
    `,
    checkResults: (roleConfig) => `
        <h4>Latest Examination Results: Quarterly Test</h4>
        <p class="cultural-text">ଫଳାଫଳ ବିବରଣୀ</p>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Marks Obtained</th>
                    <th>Max. Marks</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Mathematics</td>
                    <td>88</td>
                    <td>100</td>
                    <td><span class="status-badge completed">A+</span></td>
                </tr>
                <tr>
                    <td>Science</td>
                    <td>75</td>
                    <td>100</td>
                    <td><span class="status-badge completed">B+</span></td>
                </tr>
                <tr>
                    <td>Social Science</td>
                    <td>92</td>
                    <td>100</td>
                    <td><span class="status-badge completed">A+</span></td>
                </tr>
            </tbody>
        </table>
        <p class="mt-2">Overall Performance: **Excellent**</p>
    `,
    viewTimetable: (roleConfig) => `
        <h4>Class Time Table: 10-A</h4>
        <p class="cultural-text">ସମୟ ସାରଣୀ</p>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>9:00 - 10:00</td><td>Math</td><td>Science</td><td>Odia</td><td>English</td><td>Math</td></tr>
                <tr><td>10:00 - 11:00</td><td>Science</td><td>English</td><td>Social Sci</td><td>Math</td><td>Odia</td></tr>
                <tr><td>11:30 - 12:30</td><td>Social Sci</td><td>Math</td><td>Science</td><td>Odia</td><td>English</td></tr>
                <tr><td>12:30 - 1:30</td><td>English</td><td>Odia</td><td>Math</td><td>Science</td><td>Social Sci</td></tr>
            </tbody>
        </table>
    `,
    markAttendance: (roleConfig) => `
        <h4>Mark Attendance for Class 10-A Today</h4>
        <p class="cultural-text">ଆଜିର ଉପସ୍ଥାନ</p>
        <form onsubmit="event.preventDefault(); alert('Attendance Submitted for 45 students.'); closeModal();">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Roll No.</th>
                        <th>Student Name</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Aarav Das</td>
                        <td>
                            <select class="form-select">
                                <option value="present">Present</option>
                                <option value="absent">Absent</option>
                                <option value="late">Late</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Bhavna Sahu</td>
                        <td>
                            <select class="form-select">
                                <option value="present" selected>Present</option>
                                <option value="absent">Absent</option>
                                <option value="late">Late</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>15</td>
                        <td>Ravi Kumar Patel</td>
                        <td>
                            <select class="form-select">
                                <option value="present" selected>Present</option>
                                <option value="absent">Absent</option>
                                <option value="late">Late</option>
                            </select>
                        </td>
                    </tr>
                    </tbody>
            </table>
            <div class="action-buttons">
                <button type="submit" class="btn btn-success">Submit Attendance</button>
            </div>
        </form>
    `,
    // Parent-specific
    payFees: (roleConfig) => `
        <h4>Fee Payment for Ravi Kumar Patel</h4>
        <p class="cultural-text">ଫିସ୍ ପୈଠ</p>
        <div style="background: var(--light-gray); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
            <p><strong>Due Amount:</strong> ₹5,000.00</p>
            <p><strong>Due Date:</strong> October 15, 2024</p>
            <p><strong>Last Payment:</strong> ₹8,000.00 (April 2024)</p>
        </div>
        <div class="form-group">
            <label class="form-label">Amount to Pay</label>
            <input type="number" class="form-input" value="5000" min="100" max="5000">
        </div>
        <div class="action-buttons">
            <button class="btn btn-primary" onclick="alert('Payment of ₹5,000 initiated via UPI.'); closeModal();">Proceed to Payment Gateway</button>
        </div>
    `,
    // Headmaster-specific
    approveLeave: (roleConfig) => `
        <h4>Pending Leave Applications</h4>
        <p class="cultural-text">ଛୁଟି ଆବେଦନଗୁଡିକ</p>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Applicant</th>
                    <th>Role</th>
                    <th>Date Range</th>
                    <th>Reason</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Sushree Anjali Das</td>
                    <td>Teacher (10-A)</td>
                    <td>2024-10-25 to 2024-10-27 (3 days)</td>
                    <td>Family Function</td>
                    <td>
                        <button class="btn btn-success btn-sm" style="padding: 0.5rem 1rem;" onclick="alert('Leave Approved!'); closeModal();">Approve</button>
                    </td>
                </tr>
                <tr>
                    <td>Gita Sahu</td>
                    <td>Staff (Library)</td>
                    <td>2024-11-01 (1 day)</td>
                    <td>Medical Appointment</td>
                    <td>
                        <button class="btn btn-success btn-sm" style="padding: 0.5rem 1rem;" onclick="alert('Leave Approved!'); closeModal();">Approve</button>
                    </td>
                </tr>
            </tbody>
        </table>
    `,
    // District Officer-specific
    approveTransfer: (roleConfig) => `
        <h4>Pending Teacher Transfer Requests</h4>
        <p class="cultural-text">ଶିକ୍ଷକ ସ୍ଥାନାନ୍ତର ଅନୁମୋଦନ</p>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Teacher ID</th>
                    <th>Name</th>
                    <th>From School</th>
                    <th>To School</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>TCH2015050</td>
                    <td>Kumar Patra</td>
                    <td>Block A High School</td>
                    <td>Block B Secondary</td>
                    <td>
                        <button class="btn btn-success btn-sm" style="padding: 0.5rem 1rem;" onclick="alert('Transfer Approved!'); closeModal();">Approve</button>
                    </td>
                </tr>
                <tr>
                    <td>TCH2020112</td>
                    <td>Priya Senapati</td>
                    <td>Kalinga Inst. Tech.</td>
                    <td>City Central School</td>
                    <td>
                        <button class="btn btn-success btn-sm" style="padding: 0.5rem 1rem;" onclick="alert('Transfer Approved!'); closeModal();">Approve</button>
                    </td>
                </tr>
            </tbody>
        </table>
    `,
    // Generic fallback
    default: (roleConfig, actionName) => `
        <h4>Feature in Development</h4>
        <p class="cultural-text">ଏହି ବୈଶିଷ୍ଟ୍ୟ ବିକାଶାଧୀନ</p>
        <p>The action **'${actionName}'** is not yet fully implemented for the **${roleConfig.roleBadge}** role.</p>
        <p>Thank you for your patience as we enhance the Odisha Education Portal.</p>
    `
};


// Utility Functions
function getRoleConfig(role) {
    return roleConfigs[role] || roleConfigs['student']; // Default to student if role is unknown
}

// Dashboard Rendering Functions
function renderStats(roleConfig) {
    statsGrid.innerHTML = roleConfig.stats.map(stat => `
        <div class="stat-card">
            <div class="stat-icon">${stat.icon}</div>
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
            <div class="stat-change ${stat.type}">${stat.change}</div>
        </div>
    `).join('');
}

function renderQuickActions(roleConfig) {
    quickActions.innerHTML = roleConfig.quickActions.map(action => `
        <a href="#" class="action-btn" data-action="${action.action}" onclick="openModal('${action.action}')">
            <div class="action-icon">${action.icon}</div>
            <div class="action-text">${action.text}</div>
            <div class="action-text-odia">${action.textOdia}</div>
        </a>
    `).join('');
}

function renderServices(roleConfig) {
    servicesGrid.innerHTML = roleConfig.services.map(service => `
        <div class="service-card">
            <div class="service-header">
                <div class="service-icon">${service.icon}</div>
                <div class="service-title">${service.title}</div>
                <div class="service-title-odia">${service.titleOdia}</div>
            </div>
            <div class="service-body">
                <p class="service-description">${service.description}</p>
                <a href="#" class="btn btn-primary" style="padding: 0.75rem 1.5rem; font-size: 0.9rem;" onclick="alert('${service.title} service activated!')">Access Service</a>
            </div>
        </div>
    `).join('');
}

function populateDashboard(role) {
    currentRole = role;
    const config = getRoleConfig(role);

    // Update Header Info
    userName.textContent = config.nameEng;
    userRole.textContent = config.roleBadge;
    userId.textContent = `ID: ${config.userID}`;
    userAvatar.textContent = config.nameEng.charAt(0); // First letter of English name
    dashboardPage.className = `page dashboard-page active ${role}`;

    // Update Dashboard Title
    dashboardTitle.textContent = config.title;
    dashboardSubtitle.textContent = config.subtitle;
    dashboardOdiaText.textContent = config.titleOdia;
    roleBadge.textContent = config.roleBadge;

    // Render Dynamic Sections
    renderStats(config);
    renderQuickActions(config);
    renderServices(config);

    // Hide loading screen and switch to dashboard
    loginPage.classList.remove('active');
    dashboardPage.classList.add('active');
}

// Event Handlers

function initialize() {
    // Hide loading screen after 1.5 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Ensure login page is visible initially
        loginPage.classList.add('active');
    }, 1500);

    // Setup Role Selection
    document.querySelectorAll('.role-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedRole = this.getAttribute('data-role');
            loginForm.classList.add('show');

            // Pre-fill credentials for demo
            const config = roleConfigs[selectedRole];
            document.getElementById('email').value = config.credentials.email;
            document.getElementById('password').value = config.credentials.password;
        });
    });
}

function handleLogin(event) {
    event.preventDefault();

    if (!selectedRole) {
        alert('Please select a role first!');
        return;
    }

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const config = roleConfigs[selectedRole];

    // Simple client-side validation using sample data
    if (email === config.credentials.email && password === config.credentials.password) {
        populateDashboard(selectedRole);
    } else {
        alert('Login Failed! Check the sample credentials provided above.');
    }
}

function openModal(actionName) {
    const config = getRoleConfig(currentRole);
    const contentGenerator = modalContentTemplates[actionName] || modalContentTemplates['default'];

    modalTitle.textContent = actionName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    modalTitleOdia.textContent = config.quickActions.find(a => a.action === actionName)?.textOdia || 'କାର୍ଯ୍ୟ';
    modalBody.innerHTML = contentGenerator(config, actionName);
    
    modalOverlay.classList.add('show');
}

function closeModal() {
    modalOverlay.classList.remove('show');
}

function logout() {
    currentRole = null;
    selectedRole = null;
    
    // Clear form
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    loginForm.classList.remove('show');
    
    // Remove role selection
    document.querySelectorAll('.role-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Reset dashboard page class
    dashboardPage.className = 'page';

    // Switch pages
    dashboardPage.classList.remove('active');
    loginPage.classList.add('active');
}

// Initialize the application when the DOM is ready
document.addEventListener('DOMContentLoaded', initialize);

// Event Listeners
document.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Add interactive sound effects (optional)
document.addEventListener('click', function(e) {
    if (e.target.closest('.action-btn') || e.target.closest('.role-card')) {
        // Could add a subtle click sound here
        e.target.style.transform = 'scale(0.98)';
        setTimeout(() => {
            if (e.target) e.target.style.transform = '';
        }, 100);
    }
});
