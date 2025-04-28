import React, { useState } from "react";
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
  DialogActions,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const NoticeBoard = () => {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Hostel Curfew Reminder",
      content: "All residents must return by 11:00 PM",
      date: "2023-06-15",
    },
    {
      id: 2,
      title: "Water Maintenance",
      content: "No water supply from 9AM-3PM tomorrow",
      date: "2023-06-16",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: "",
    content: "",
  });

  const handleAddNotice = () => {
    setNotices([
      {
        id: Date.now(),
        title: newNotice.title,
        content: newNotice.content,
        date: new Date().toISOString().split("T")[0],
      },
      ...notices,
    ]);
    setNewNotice({ title: "", content: "" });
    setOpen(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f3e8ff", padding: 16 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" sx={{ color: "#4f46e5", fontWeight: "bold" }}>
          Notice Board
        </Typography>
      </Box>

      {/* Notices List */}
      {notices.map((notice) => (
        <Card
          key={notice.id}
          sx={{
            mb: 3,
            backgroundColor: "white",
            borderRadius: 3,
            boxShadow: 3,
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: 6,
            },
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{ color: "#4f46e5", fontWeight: "bold" }}
              gutterBottom
            >
              {notice.title}
            </Typography>
            <Typography sx={{ color: "black", mb: 2 }}>
              {notice.content}
            </Typography>
            <Typography sx={{ fontSize: 14, color: "gray" }}>
              Posted: {notice.date}
            </Typography>
          </CardContent>
        </Card>
      ))}

      {/* Add Notice Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle
          sx={{
            backgroundColor: "#4f46e5",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Add New Notice
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "white" }}>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={newNotice.title}
            onChange={(e) =>
              setNewNotice({ ...newNotice, title: e.target.value })
            }
            sx={{
              "& label.Mui-focused": { color: "#4f46e5" },
              "& .MuiInput-underline:after": { borderBottomColor: "#4f46e5" },
            }}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={newNotice.content}
            onChange={(e) =>
              setNewNotice({ ...newNotice, content: e.target.value })
            }
            sx={{
              "& label.Mui-focused": { color: "#4f46e5" },
              "& .MuiInput-underline:after": { borderBottomColor: "#4f46e5" },
              mt: 2,
            }}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "white", padding: 2 }}>
          <Button onClick={() => setOpen(false)} sx={{ color: "#4f46e5" }}>
            Cancel
          </Button>
          <Button
            onClick={handleAddNotice}
            variant="contained"
            sx={{
              backgroundColor: "#4f46e5",
              ":hover": { backgroundColor: "#4338ca" },
            }}
          >
            Post Notice
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NoticeBoard;
