export const resourcesList = [
    { id: 1, value: "Dashboard" },
    { id: 2, value: "Tutor" },
    { id: 2.1, value: "Tutor List" },
    { id: 2.2, value: "Tutor Payment" },
    { id: 3, value: "Student" },
    { id: 3.1, value: "Student List" },
    { id: 4, value: "Wallet" },
    { id: 5, value: "Question Subject" },
    { id: 6, value: "Student Class" },
    { id: 7, value: "Question Type" },
    { id: 8, value: "Curruncy" },
    { id: 9, value: "Search Engine" },
    { id: 10, value: "Issue Question" },
    { id: 11, value: "Question" },
    { id: 11.1, value: "Tutor" },
    { id: 11.2, value: "Admin" },
    { id: 11.3, value: "Reanswer" },
    { id: 11.4, value: "Unsolved" },
    { id: 12, value: "Question Timing" },
    { id: 13, value: "Question Pricing" },
    { id: 14, value: "Question Reanswer" },
    { id: 15, value: "Tutor Exam Question" },
    { id: 16, value: "Tutor Exam Checking" },
    { id: 17, value: "Tutor Exam Configuration" },
    { id: 18, value: "Student Referral" },
    { id: 19, value: "Student Posting Streak" },
    { id: 20, value: "Tutor Referral" },
    { id: 21, value: "Tutor Posting Streak" },
    { id: 22, value: "Testimonial" },
    { id: 23, value: "Pages" },
    { id: 24, value: "Features" },
    { id: 25, value: "Services" },
    { id: 26, value: "Coupon" },
    { id: 27, value: "User" },
    { id: 28, value: "Role" },
    { id: 28.1, value: "Tutor" },
    { id: 28.2, value: "Admin" },
    { id: 28.3, value: "Reanswer" },
    { id: 28.4, value: "UnSloved" },
    { id: 29, value: "Profile" },
    { id: 30, value: "Settings" },
    { id: 30.1, value: "Social Media Setting" },
    { id: 30.2, value: "Email Settings" },
    { id: 31, value: "Add Mobile No" },
    { id: 32, value: "Contact us" },
    { id: 33, value: "Sign Out" },
  ];

  export const getResourceValue = (ids) => {
    const result = [];

  const findResource = (ids, resourcesList) => {
    for (const item of resourcesList) {
      if (ids.includes(item.id)) {
        result.push(item.value);
        if (ids.length > 1 && Array.isArray(item.children)) {
          findResource(ids.slice(1), item.children);
        }
      }
    }
  };

  findResource(ids, resourcesList);

  return result.join(", ");
  };