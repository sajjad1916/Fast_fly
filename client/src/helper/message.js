import React from 'react';

export const showErrorMsg = (msg) => (
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
  <strong> {msg} </strong> 
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
);

export const showSuccessMsg = (msg) => (
    <div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong> {msg} </strong> 
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
);

