
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent,
  alpha 
} from '@mui/material';
import theme from '../theme';

const Categories = () => {
  const dummyCategories = [
    {
      title: "Fiction & Literature",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      title: "Science & Technology",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      title: "History & Biography",
      description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
    },
    {
      title: "Mystery & Thriller",
      description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet."
    },
    {
      title: "Romance & Drama",
      description: "Consectetur, adipisci velit, sed quia non numquam eius modi tempora incididunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam."
    },
    {
      title: "Children & Young Adult",
      description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus."
    }
  ];

  return (
    <Box 
      textAlign="center" 
      py={8} 
      sx={{
        minHeight: '100vh', 
        mb: 0, 
        position: 'relative', 
        backgroundImage: 'url(https://images.unsplash.com/photo-1635621450236-da71ab3f362e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center', 
        backgroundSize: 'cover' 
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: alpha(theme.palette.secondary.main, 0.5),
          zIndex: 1,
        }}
      />
      
      <Container 
        mb={0} 
        sx={{ 
          position: 'relative', 
          backgroundColor: 'transparent', 
          color: theme.palette.text.primary, 
          zIndex: 2 
        }}
      >
        <Box mt={10} px={5} textAlign="center">
          <Typography 
            variant="h2" 
            fontWeight="bold" 
            mb={2} 
            sx={{ fontFamily: theme.typography.h2.fontFamily }}
          >
            Book Categories
          </Typography>
          <Typography 
            variant="h6" 
            maxWidth="600px" 
            mx="auto" 
            mb={6} 
            sx={{ fontFamily: theme.typography.body1.fontFamily }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {dummyCategories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom
                      sx={{ 
                        fontFamily: theme.typography.h2.fontFamily,
                        fontWeight: 'bold',
                        color: theme.palette.primary.main,
                        mb: 2
                      }}
                    >
                      {category.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ 
                        lineHeight: 1.7,
                        textAlign: 'justify',
                        fontFamily: theme.typography.body1.fontFamily
                      }}
                    >
                      {category.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box mt={8}>
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              mb={3} 
              sx={{ fontFamily: theme.typography.h2.fontFamily }}
            >
              Discover Your Next Read
            </Typography>
            <Typography 
              variant="h6" 
              maxWidth="800px" 
              mx="auto" 
              sx={{ fontFamily: theme.typography.body1.fontFamily }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Categories;