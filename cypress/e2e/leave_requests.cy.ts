describe('Create a leave request', () => {
  it('blocks when not logged in', () => {

    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

    cy.request("POST", "http://127.0.0.1:54321/rest/v1/leave_requests", {
      apikey: supabaseKey,
      "Authorization": "Bearer " + supabaseKey,
      "Content-Type": "application/json",
    }).then((response: any) => {
    });
  })
})