import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AnalyzedText from './AnalyzedText';
import ResultTable from './ResultTable';
import ResultCard from './ResultCard';
import axios from 'axios';

const Engineering1 = ({ selectedCellValue }) => {
  const [text, setText] = useState('');
  const [showSVG, setShowSVG] = useState(false);
  const [message, setMessage] = useState({ selectedCellValue });
  const [response1, setResponse1] = useState('no result');
  const [response2, setResponse2] = useState('no result');
  const [response3, setResponse3] = useState('no result');

  const handleSendMessage1 = async () => {
    // if (!message.trim()) return;

    try {
      console.log('Sending message:', selectedCellValue);
      const res = await axios.post('https://dataize.io/aws_api/tumormarkertest/', {
        message: selectedCellValue,
      });

      console.log('API Response:', res.data);

      if (res.data && res.data.chatgpt_response) {
        setResponse1(res.data.chatgpt_response); // JSON 파싱 없이 문자열 그대로 저장
      } else {
        setResponse1('No response data available.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setResponse1('Error: Unable to reach the server.');
    }
  };

  const handleSendMessage2 = async () => {
    // if (!message.trim()) return;

    try {
      console.log('Sending message:', selectedCellValue);
      const res = await axios.post('https://dataize.io/aws_api/primarycancer/', {
        message: selectedCellValue,
      });

      console.log('API Response:', res.data);

      if (res.data && res.data.chatgpt_response) {
        setResponse2(res.data.chatgpt_response); // JSON 파싱 없이 문자열 그대로 저장
      } else {
        setResponse2('No response data available.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setResponse2('Error: Unable to reach the server.');
    }
  };

  const handleSendMessage3 = async () => {
    // if (!message.trim()) return;

    try {
      console.log('Sending message:', selectedCellValue);
      const res = await axios.post('https://dataize.io/aws_api/tumor/', {
        message: selectedCellValue,
      });

      console.log('API Response:', res.data);

      if (res.data && res.data.chatgpt_response) {
        setResponse3(res.data.chatgpt_response); // JSON 파싱 없이 문자열 그대로 저장
      } else {
        setResponse3('No response data available.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setResponse3('Error: Unable to reach the server.');
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '97%',
            mr: '28px',
            marginTop: '20px',
          }}
        >
          <Button
            onClick={handleSendMessage1}
            sx={{
              mr: '5px',
              width: '203px',
              height: '42px',
              backgroundColor: '#EDB369',
            }}
          >
            <Typography
              sx={{
                fontSize: '13px',
                color: '#000000',
                fontFamily: 'Noto Sans KR',
              }}
            >
              Tumor Marker Test
            </Typography>
          </Button>
          <Button
            onClick={handleSendMessage2}
            sx={{
              mr: '5px',
              width: '203px',
              height: '42px',
              backgroundColor: '#EDB369',
            }}
          >
            <Typography
              sx={{
                fontSize: '13px',
                color: '#000000',
                fontFamily: 'Noto Sans KR',
              }}
            >
              Primary Cancer Condtion
            </Typography>
          </Button>
          <Button
            onClick={handleSendMessage3}
            sx={{ width: '203px', height: '42px', backgroundColor: '#E69CFF' }}
          >
            <Typography
              sx={{
                fontSize: '13px',
                color: '#000000',
                fontFamily: 'Noto Sans KR',
              }}
            >
              Tumor
            </Typography>
          </Button>
        </Box>

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
              {/* {showSVG && (
          <Result sentence={selectedCellValue} word1={word1} word2={word2} />
        )} */}
              <AnalyzedText
                sentence={selectedCellValue}
                word1={word1}
                word2={word2}
                response1={response1}
                response2={response2}
                response3={response3}
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
              <ResultTable />

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
