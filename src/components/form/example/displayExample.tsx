import { Box, Button, List, ListItem, Modal } from '@mui/material';
import { useState } from 'react';

function DisplayExample(props: {
  display: string[];
}) {

  const [route, setShowRoute] = useState(false);
  const { display } = props;

  return (
    <Box>
      <Button color="primary" variant="contained" sx={{ mx: 2 }} onClick={() => { setShowRoute(true); }}> Voir </Button>
      <Modal
        id="modal-crud-container"
        hideBackdrop
        open={route}
        onClose={() => setShowRoute(false)}
        aria-labelledby="checkbox-route-title"
        aria-describedby="child-modal-description"
      >
        <Box className="modal-crud modal-crud-route" sx={{ bgcolor: 'background.default' }}>
          <List dense sx={{ minWidth: 350 }}>
            {display && JSON.parse(display as unknown as string).map((item: string) => (
              <ListItem key={item} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {item}
              </ListItem>
            ))}
          </List>
          <Box className="action-button">
            <Button variant="contained" onClick={() => setShowRoute(false)}>Fermer</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
export default DisplayExample;
