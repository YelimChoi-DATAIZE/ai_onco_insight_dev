import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import ButtonGroup from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import TextWithArrow from './AnalyzedText';
import ResultTable from './ResultTable';
import ResultCard from './ResultCard';
import axios from 'axios';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const Engineering1 = ({ selectedCellValue, columnDefs = [], onAnnotate, selectedRow }) => {
  const [text, setText] = useState('');
  const [showSVG, setShowSVG] = useState(false);
  const [message, setMessage] = useState({ selectedCellValue });
  const [response1, setResponse1] = useState('no result');
  const [response2, setResponse2] = useState('no result');
  const [response3, setResponse3] = useState('no result');

  const handleSendMessage = async () => {
    // if (!message.trim()) return;

    try {
      console.log('Sending message:', selectedCellValue);
      const res = await axios.post('http://3.38.200.207:8000/dataizeai_api/Result/', {
        message: selectedCellValue,
      });

      console.log('API Response:', res.data);

      if (res.data) {
        setResponse1(res.data);
      } else {
        setResponse1('No response data available.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setResponse1('Error: Unable to reach the server.');
    }
  };

  const word1 = 'ER:';
  const word2 = 'Negative';

  useEffect(() => {
    if (selectedCellValue) {
      setText(selectedCellValue);

      const hasWord1 = selectedCellValue.includes(word1);
      const hasWord2 = selectedCellValue.includes(word2);

      setShowSVG(hasWord1 && hasWord2);
    } else {
      setShowSVG(false);
    }
  }, [selectedCellValue]);

  const [alignment, setAlignment] = useState('');

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const filteredColumnDefs = columnDefs.filter(
    (col) => !col.field.startsWith('ent_') && !col.field.endsWith('_entities')
  );

  const columnOptions = columnDefs.map((col) => col.field);
  const handleAnnotateClick = () => {
    if (alignment) {
      onAnnotate(alignment); // ✅ 선택된 컬럼 이름으로 함수 호출
    } else {
      alert('📌 먼저 컬럼을 선택해주세요.');
    }
  };

  return (
    <>
      <Box
        sx={{
          mt: '150px',
          flexGrow: 1,
          width: '48.5%',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          borderLeft: '2px solid #ddd',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          justifyContent: 'flex-start',
          paddingTop: '28px',
          fontSize: '14px',
          position: 'absolute',
          right: 0,
          top: 0,
        }}
      >
        <Box sx={{ ml: '26px', marginBottom: '15px' }}>
          <Typography sx={{ fontFamily: 'Noto Sans KR' }}>SELECT TARGET COLUMN</Typography>
        </Box>
        <FormControl
          component="fieldset"
          sx={{
            ml: '26px',
            mr: '26px',
            mb: 2,
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            // maxHeight: '120px',
            overflowY: 'auto',
            border: '1px solid #ccc',
            borderRadius: '8px',
            p: 2,
            backgroundColor: '#f9f9f9',
          }}
        >
          <RadioGroup
            name="column-radio-group"
            row
            value={alignment}
            onChange={(e) => setAlignment(e.target.value)}
          >
            {filteredColumnDefs.map((col) => (
              <FormControlLabel
                key={col.field}
                value={col.field}
                control={<Radio size="small" />}
                label={
                  <Typography
                    sx={{
                      fontSize: '12px',
                      fontFamily: 'Noto Sans KR',
                    }}
                  >
                    {col.field}
                  </Typography>
                }
                sx={{
                  mr: 1.5,
                  whiteSpace: 'nowrap',
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '97%',
            mr: '28px',
            marginTop: '15px',
          }}
        >
          <Button
            onClick={handleAnnotateClick}
            sx={{
              mr: '5px',
              width: '203px',
              height: '42px',
              backgroundColor: '#2F72B9',
            }}
          >
            <Typography
              sx={{
                fontSize: '13px',
                color: '#ffffff',
                fontFamily: 'Noto Sans KR',
              }}
            >
              Total Extraction
            </Typography>
          </Button>
        </Box>

        <Box sx={{ ml: '26px', marginBottom: '5px' }}>
          <Typography sx={{ fontFamily: 'Noto Sans KR' }}>SELECTED DATA</Typography>
        </Box>

        <TextField
          id="outlined-read-only-input-1"
          value={selectedCellValue || ''}
          inputProps={{
            readOnly: true,
            style: { fontSize: '14px', lineHeight: '1' },
          }}
          variant="outlined"
          multiline
          rows={20}
          sx={{
            ml: '26px',
            mt: '12px',
            padding: '1px',
            borderRadius: '2px',
            backgroundColor: '#fff',
            width: '95%',
            fontFamily: 'Noto Sans KR',
            '& fieldset': { border: 'none' },
          }}
        />

        {/* Comprehend Result */}
        <Box sx={{ mt: '20px', ml: '26px', width: '95%' }}>
          <Card sx={{ mb: '10px', p: '27px', borderRadius: '8px' }}>
            <CardContent>
              <Typography
                sx={{
                  fontFamily: 'Noto Sans KR',
                  fontWeight: '700',
                  fontSize: '14px',
                  mb: '8px',
                }}
              >
                Analyzed Text
              </Typography>

              <TextWithArrow
                sentence={selectedRow?._sentence || selectedCellValue}
                words={selectedRow?._words || []}
              />

              <Typography
                sx={{
                  fontFamily: 'Noto Sans KR',
                  fontWeight: '700',
                  fontSize: '14px',
                  mb: '8px',
                }}
              >
                Result Table
              </Typography>
              <ResultTable response={response1} />

              <Typography
                sx={{
                  fontFamily: 'Noto Sans KR',
                  fontWeight: '700',
                  fontSize: '14px',
                  mb: '8px',
                }}
              >
                Result Card
              </Typography>
              <ResultCard />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default Engineering1;
