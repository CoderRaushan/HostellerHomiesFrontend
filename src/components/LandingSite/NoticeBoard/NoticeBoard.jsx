import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const NoticeBoard = () => {
  // Sample notices data
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Hostel Curfew Reminder",
      content: "All residents must return by 11:00 PM",
      date: "2023-06-15"
    },
    {
      id: 2,
      title: "Water Maintenance",
      content: "No water supply from 9AM-3PM tomorrow",
      date: "2023-06-16"
    }
  ]);

  // Form state
  const [open, setOpen] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    content: ''
  });

  const handleAddNotice = () => {
    setNotices([
      {
        id: Date.now(),
        title: newNotice.title,
        content: newNotice.content,
        date: new Date().toISOString().split('T')[0]
      },
      ...notices
    ]);
    setNewNotice({ title: '', content: '' });
    setOpen(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, color:"white" }}>
        <Typography variant="h4">Notice Board</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Notice
        </Button>
      </Box>

      {/* Notices List */}
      {notices.map((notice) => (
        <Card key={notice.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {notice.title}
            </Typography>
            <Typography paragraph>
              {notice.content}
            </Typography>
            <Typography color="text.secondary">
              Posted: {notice.date}
            </Typography>
          </CardContent>
        </Card>
      ))}

      {/* Add Notice Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Notice</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={newNotice.title}
            onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={newNotice.content}
            onChange={(e) => setNewNotice({...newNotice, content: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddNotice} variant="contained">
            Post Notice
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NoticeBoard;