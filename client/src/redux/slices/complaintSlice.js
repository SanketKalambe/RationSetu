import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const fetchConsumerComplaints = createAsyncThunk('complaints/fetchConsumer', async (_, { rejectWithValue }) => {
  try {
    const response = await API.get('/consumer/complaints');
    return response.data.complaints;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to fetch complaints.');
  }
});

export const getComplaintSuggestion = createAsyncThunk('complaints/suggest', async (payload, { rejectWithValue }) => {
  try {
    const response = await API.post('/consumer/complaints/suggest', payload);
    return response.data.suggestion;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Suggestion failed.');
  }
});

export const submitComplaint = createAsyncThunk('complaints/submit', async (formData, { rejectWithValue, dispatch }) => {
  try {
    const response = await API.post('/consumer/complaints', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    dispatch(fetchConsumerComplaints());

    // Real-Time Cross-Tab & Device Synchronization Broadcast to Admin
    try {
      if (typeof window !== 'undefined') {
        if ('BroadcastChannel' in window) {
          const bc = new BroadcastChannel('rationsetu_realtime_events');
          bc.postMessage({
            type: 'COMPLAINT_FILED',
            payload: response.data.complaint,
            timestamp: Date.now()
          });
        }
        localStorage.setItem('rationsetu_last_complaint_event', JSON.stringify({
          type: 'COMPLAINT_FILED',
          payload: response.data.complaint,
          timestamp: Date.now()
        }));
      }
    } catch (e) {
      console.warn('Real-time complaint broadcast notice:', e);
    }

    return response.data.complaint;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to submit complaint.');
  }
});

const complaintSlice = createSlice({
  name: 'complaints',
  initialState: {
    complaints: [],
    suggestion: null,
    loading: false,
    error: null,
    successMessage: null
  },
  reducers: {
    clearSuggestion: (state) => {
      state.suggestion = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConsumerComplaints.fulfilled, (state, action) => {
        state.complaints = action.payload;
      })
      .addCase(getComplaintSuggestion.fulfilled, (state, action) => {
        state.suggestion = action.payload;
      })
      .addCase(submitComplaint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitComplaint.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = 'Complaint submitted successfully!';
      })
      .addCase(submitComplaint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearSuggestion } = complaintSlice.actions;
export default complaintSlice.reducer;
