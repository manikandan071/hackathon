// get jobs details from sharepoint list

export const getCurrentUser = async (accessToken: string) => {
  const res = await fetch("https://graph.microsoft.com/v1.0/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return await res.json();
};

export const getjobsDetails = async (
  accessToken: string | null,
  setAllJobs: any,
) => {
  console.log("accessToken", accessToken);

  try {
    const tenant = "chandrudemo.sharepoint.com";
    const siteName = "FieldService";
    const listName = "Jobs";

    const siteRes = await fetch(
      `https://graph.microsoft.com/v1.0/sites/${tenant}:/sites/${siteName}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    const siteData = await siteRes.json();
    const siteId = siteData.id;
    console.log("Site ID:", siteId);
    const listRes = await fetch(
      `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listName}/items?$expand=fields($select=Title,Descriptions,StartDate,EndDate,Rating,FeedBacks,Status,Priority,CustomerLookupId,)`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    const jobsData = await listRes.json();
    console.log("job Items:", jobsData.value);

    const jobsWithCustomer = await Promise.all(
      jobsData.value.map(async (job: any) => {
        const customerId = job.fields.CustomerLookupId;

        const customerRes = await fetch(
          `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/CustomerDetails/items/${customerId}?$expand=fields($select=Address1,Address2,City,FirstName,LastName,ContactNo,ContactEmail)`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );

        const customerData = await customerRes.json();

        return {
          id: Number(job.id),
          title: job.fields.Title,
          status: job.fields.Status,
          priority: job.fields.Priority,
          startDate: job.fields.StartDate,
          endDate: job.fields.EndDate,
          customerRating: job.fields.Rating,
          customerFeedback: job.fields.FeedBacks,
          customerId: customerId,
          firstName: customerData.fields.FirstName,
          lastName: customerData.fields.LastName,
          customer:
            customerData.fields.FirstName + " " + customerData.fields.LastName,
          address1: customerData.fields.Address1,
          address2: customerData.fields.Address2,
          address:
            customerData.fields.Address1 +
            ", " +
            customerData.fields.Address2 +
            ", " +
            customerData.fields.City,
          city: customerData.fields.City,
          contactNo: customerData.fields.ContactNo,
          contactEmail: customerData.fields.ContactEmail,
        };
      }),
    );

    setAllJobs(jobsWithCustomer);
  } catch (error) {
    console.error("Error fetching job details:", error);
  }
};

export const getRecentActivities = async (
  accessToken: string | null,
  setRecentActivities: any,
) => {
  console.log("accessToken", accessToken);

  try {
    const tenant = "chandrudemo.sharepoint.com";
    const siteName = "FieldService";
    const listName = "Activities";

    const siteRes = await fetch(
      `https://graph.microsoft.com/v1.0/sites/${tenant}:/sites/${siteName}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    const siteData = await siteRes.json();
    const siteId = siteData.id;
    console.log("Site ID:", siteId);
    const listRes = await fetch(
      `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listName}/items?$expand=fields($select=Title,Description,JobLookupId,)`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    const jobsData = await listRes.json();
    console.log("job Items:", jobsData.value);

    const jobsWithCustomer = await Promise.all(
      jobsData.value.map(async (job: any) => {
        return {
          id: Number(job.id),
          title: job.fields.Title,
          description: job.fields.Description,
          job: Number(job.fields.JobLookupId),
          created: job.createdDateTime,
        };
      }),
    );

    setRecentActivities(jobsWithCustomer);
  } catch (error) {
    console.error("Error fetching job details:", error);
  }
};

export const getActiveClockRecord = async (
  accessToken: string,
  siteId: string,
  userEmail: string,
) => {
  const res = await fetch(
    `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/ClockInOut/items?$expand=fields($select=StartTime,EndTime,Owner,ClockOut)`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

  const data = await res.json();
  console.log("Res", userEmail, data);
  const filtered = data.value.filter((item: any) => {
    const owner = item.createdBy.user.email;
    const clockOut = item.fields.ClockOut;
    return owner === userEmail && clockOut === false;
  });
  console.log("Filtered", filtered);
  return filtered.length > 0 ? filtered[0] : null;
};

export const clockIn = async (
  accessToken: string,
  siteId: string,
  userId: string,
) => {
  console.log(userId);

  await fetch(
    `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/ClockInOut/items`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          StartTime: new Date().toISOString(),
          ClockOut: false,
        },
      }),
    },
  );
};

export const clockOut = async (
  accessToken: string,
  siteId: string,
  itemId: string,
) => {
  console.log("Attempting to clock out:", { accessToken, siteId, itemId });

  await fetch(
    `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/ClockInOut/items/${itemId}/fields`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EndTime: new Date().toISOString(),
        ClockOut: true,
      }),
    },
  );
};

export const getEmployeeDetails = async (
  accessToken: string | null,
  setEmployeeDetails: any,
  usermail: string,
) => {
  console.log("accessToken", accessToken);

  try {
    const tenant = "chandrudemo.sharepoint.com";
    const siteName = "FieldService";
    const listName = "EmployeeDetails";

    const siteRes = await fetch(
      `https://graph.microsoft.com/v1.0/sites/${tenant}:/sites/${siteName}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    const siteData = await siteRes.json();
    const siteId = siteData.id;
    console.log("Site ID:", siteId);
    const listRes = await fetch(
      `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listName}/items?$expand=fields($select=Employee,EmployeeLookupId,EmployeeEMail,SkillSets,Role,Level,ContactNo,ContactEmail,Address1,Address2,City,)`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    const EmployessData = await listRes.json();
    console.log("Employee Items:", EmployessData.value);

    const EmployeeWithDetails = await Promise.all(
      EmployessData.value.map(async (employee: any) => {
        return {
          id: Number(employee.id),
          employee: employee.fields.Employee,
          skillSets: employee.fields.SkillSets,
          role: employee.fields.Role,
          level: employee.fields.Level,
          address1: employee.fields.Address1,
          address2: employee.fields.Address2,
          address:
            employee.fields.Address1 +
            ", " +
            employee.fields.Address2 +
            ", " +
            employee.fields.City,
          city: employee.fields.City,
          contactNo: employee.fields.ContactNo,
          contactEmail: employee.fields.ContactEmail,
        };
      }),
    );

    setEmployeeDetails(
      EmployeeWithDetails.filter((emp: any) => emp.contactEmail === usermail),
    );
  } catch (error) {
    console.error("Error fetching employee details:", error);
  }
};
