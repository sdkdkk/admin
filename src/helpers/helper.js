export const resourcesList = [
    { id: 1, value: "Dashboard" },
    { id: 2, value: "Tutor" },
    { id: 2.1, value: "Tutor List" },
    { id: 2.2, value: "Tutor Payment" },
    { id: 3, value: "Student" },
    { id: 3.1, value: "Student List" },
    { id: 4, value: "Wallet" },
    { id: 5, value: "Question Subject" },
    { id: 6, value: "Question Type" },
    { id: 7, value: "Curruncy" },
    { id: 8, value: "Search Engine" },
    { id: 9, value: "Question" },
    { id: 10, value: "Question Timing" },
    { id: 11, value: "Question Pricing" },
    { id: 12, value: "Question Reanswer" },
    { id: 13, value: "Tutor Exam Question" },
    { id: 14, value: "Tutor Exam Checking" },
    { id: 15, value: "Tutor Exam Configuration" },
    { id: 16, value: "Testimonial" },
    { id: 17, value: "Pages" },
    { id: 18, value: "Features" },
    { id: 19, value: "Services" },
    { id: 20, value: "Coupon" },
    { id: 21, value: "User" },
    { id: 22, value: "Role" },
    { id: 22.1, value: "Tutor" },
    { id: 22.2, value: "Admin" },
    { id: 22.3, value: "Reanswer" },
    { id: 22.4, value: "UnSloved" },
    { id: 23, value: "Profile" },
    { id: 24, value: "Tutor" },
    { id: 24.1, value: "Social Media Setting" },
    { id: 24.2, value: "Email Setting" },
    { id: 25, value: "Sign Out" },
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
  console.log('result', result, ids)

  return result.join(", ");
  };