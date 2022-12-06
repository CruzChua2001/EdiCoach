import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import { AllCoachSessions } from "./AllCoachSessions";

export const ManageAppointments = () => {
  return (
    <Container>
      <AllCoachSessions />
    </Container>
  );
};
