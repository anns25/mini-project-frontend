import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          textAlign: "center",
          boxShadow: 4,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <CancelIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h4" color="primary" gutterBottom>
            Payment Canceled
          </Typography>
          <Typography variant="body1" color="text.primary" sx={{ mb: 3 }}>
            Your transaction was canceled. No payment has been made.
            You can continue browsing and try again when you’re ready.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/cart"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Return to Cart
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
