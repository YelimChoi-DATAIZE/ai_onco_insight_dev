import React, { useEffect, useState } from 'react';
// import { RadioGroup, FormControlLabel, Radio, Typography, Button, Box } from '@mui/material';
import {
  Box,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  Paper,
  Typography,
  FormControlLabel,
  FormGroup,
  TextField,
  Card,
  CardContent,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormLabel,
} from '@mui/material';

function not(a, b) {
  return a.filter((value) => !b.includes(value));
}

function intersection(a, b) {
  return a.filter((value) => b.includes(value));
}

export const SelectVariable = ({ columnDefs = [], alignment, onChange }) => {
  const fields = columnDefs.map((col) => col.field);

  const [checked, setChecked] = useState([]);
  const [top, setTop] = useState(fields);
  const [bottom, setBottom] = useState(alignment ? [alignment] : []);

  useEffect(() => {
    if (alignment && !bottom.includes(alignment)) {
      setBottom([alignment]);
    }
  }, [alignment]);

  useEffect(() => {
    if (onChange) {
      onChange({ target: { value: bottom[0] || '' } });
    }
  }, [bottom]);

  const topChecked = intersection(checked, top);
  const bottomChecked = intersection(checked, bottom);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckedDown = () => {
    setBottom([...bottom, ...topChecked.slice(0, 1)]);
    setTop(not(top, topChecked));
    setChecked(not(checked, topChecked));
  };

  const handleCheckedUp = () => {
    setTop([...top, ...bottomChecked]);
    setBottom(not(bottom, bottomChecked));
    setChecked(not(checked, bottomChecked));
  };

  const customList = (items) => (
    <Paper
      sx={{ width: 300, height: 200, overflow: 'auto', border: '1px solid #ddd' }}
      elevation={0}
    >
      <List dense component="div" role="list">
        {(Array.isArray(items) ? items : []).map((field) => {
          const labelId = `transfer-list-item-${field}-label`;
          return (
            <ListItemButton key={field} role="listitem" onClick={handleToggle(field)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(field)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={field}
                primaryTypographyProps={{
                  fontFamily: 'Quicksand',
                  fontSize: 13,
                  fontWeight: 400,
                  color: '#333',
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <>
      <Grid container direction="column" spacing={1} alignItems="center">
        <Grid item>{customList(top)}</Grid>

        <Grid item>
          <Grid container direction="row" spacing={1} justifyContent="center">
            <Grid item>
              <Button
                variant="outlined"
                size="small"
                onClick={handleCheckedDown}
                disabled={topChecked.length === 0}
              >
                ↓
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                size="small"
                onClick={handleCheckedUp}
                disabled={bottomChecked.length === 0}
              >
                ↑
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>{customList(bottom)}</Grid>
      </Grid>
    </>
  );
};

export function TestSectionTest({ options, setOptions }) {
  const handleCheckboxChange = (key) => (e) => setOptions({ ...options, [key]: e.target.checked });

  const handleInputChange = (key) => (e) => setOptions({ ...options, [key]: e.target.value });

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography fontWeight="bold" fontFamily="Quicksand" fontSize={13}>
          Test Type
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.student}
                onChange={handleCheckboxChange('student')}
              />
            }
            label={
              <Typography fontSize={13} fontFamily="Quicksand">
                Student t ttest
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.bayes}
                onChange={handleCheckboxChange('bayes')}
              />
            }
            label={
              <Typography fontSize={13} fontFamily="Quicksand">
                Bayes Factor
              </Typography>
            }
          />
          <TextField
            label="Prior"
            size="small"
            type="number"
            variant="standard"
            value={options.prior}
            onChange={handleInputChange('prior')}
            sx={{ ml: 3, mt: -2 }}
            disabled={!options.bayes}
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.wilcoxon}
                onChange={handleCheckboxChange('wilcoxon')}
              />
            }
            label={
              <Typography fontSize={13} fontFamily="Quicksand">
                WilcoxonRank-Sum test
              </Typography>
            }
          />
        </FormGroup>
      </CardContent>
    </Card>
  );
}

export function HypothesisTestSection({ options = {}, setOptions = () => {} }) {
  const handleCheckboxChange = (key) => (e) => {
    setOptions({ ...options, [key]: e.target.checked });
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography fontWeight="bold" fontFamily="Quicksand" fontSize={13}>
          Assumption Checks
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.autocorrelation ?? false}
                onChange={handleCheckboxChange('autocorrelation')}
              />
            }
            label="Autocorrelation Test"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.collinearity ?? false}
                onChange={handleCheckboxChange('collinearity')}
              />
            }
            label="Collinearity Statistic"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.normality ?? false}
                onChange={handleCheckboxChange('normality')}
              />
            }
            label="Normality Test"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.residualQQ ?? false}
                onChange={handleCheckboxChange('residualQQ')}
              />
            }
            label="Residual Q-Q Plot"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.residualPlot ?? false}
                onChange={handleCheckboxChange('residualPlot')}
              />
            }
            label="Residual Plot"
          />
        </FormGroup>
      </CardContent>
    </Card>
  );
}

export function HypothesisTest() {
  const [options, setOptions] = useState({
    autocorrelation: false,
    collinearity: false,
    normality: false,
    residualQQ: false,
    residualPlot: false,
  });

  return <HypothesisTestSection options={options} setOptions={setOptions} />;
}

export function SummarySection({ options = {}, setOptions = () => {} }) {
  const handleCheckboxChange = (key) => (e) => {
    setOptions({ ...options, [key]: e.target.checked });
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography fontWeight="bold" fontFamily="Quicksand" fontSize={13}>
          Data Summary
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.cooksDistance ?? false}
                onChange={handleCheckboxChange('cooksDistance')}
              />
            }
            label="Cook’s Distance"
          />
        </FormGroup>
      </CardContent>
    </Card>
  );
}

export function Summary() {
  const [options, setOptions] = useState({
    cooksDistance: false,
  });

  return <SummarySection options={options} setOptions={setOptions} />;
}

export function GoodnessOfFitSection({ options = {}, setOptions = () => {} }) {
  const handleCheckboxChange = (key) => (e) => {
    setOptions({ ...options, [key]: e.target.checked });
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography fontWeight="bold" fontSize={13} fontFamily="Quicksand">
          Model Fit
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.r ?? false}
                onChange={handleCheckboxChange('r')}
              />
            }
            label="R"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.rSquared ?? false}
                onChange={handleCheckboxChange('rSquared')}
              />
            }
            label="R²"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.adjustedRSquared ?? false}
                onChange={handleCheckboxChange('adjustedRSquared')}
              />
            }
            label="Adjusted R²"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.aic ?? false}
                onChange={handleCheckboxChange('aic')}
              />
            }
            label="Akaike Information Criterion (AIC)"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.bic ?? false}
                onChange={handleCheckboxChange('bic')}
              />
            }
            label="Bayesian Information Criterion (BIC)"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.rmse ?? false}
                onChange={handleCheckboxChange('rmse')}
              />
            }
            label="Root Mean Square Error (RMSE)"
          />
        </FormGroup>
      </CardContent>
    </Card>
  );
}

export function GoodnessOfFit() {
  const [options, setOptions] = useState({
    r: true,
    rSquared: true,
    adjustedRSquared: false,
    aic: false,
    bic: false,
    rmse: false,
  });

  return <GoodnessOfFitSection options={options} setOptions={setOptions} />;
}

export function ModelValidationSection({ options = {}, setOptions = () => {} }) {
  const handleCheckboxChange = (key) => (e) => {
    setOptions({ ...options, [key]: e.target.checked });
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography fontWeight="bold" fontSize={13} fontFamily="Quicksand">
          Overall Model Test
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.fTest ?? false}
                onChange={handleCheckboxChange('fTest')}
              />
            }
            label="F-test"
          />
        </FormGroup>
      </CardContent>
    </Card>
  );
}

export function ModelValidation() {
  const [options, setOptions] = useState({
    fTest: false,
  });

  return <ModelValidationSection options={options} setOptions={setOptions} />;
}

export const Run = ({ onRunHistogram }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={onRunHistogram} sx={{ backgroundColor: '#2F72B9', color: '#fff' }}>
        Run Histogram
      </Button>
    </Box>
  );
};
