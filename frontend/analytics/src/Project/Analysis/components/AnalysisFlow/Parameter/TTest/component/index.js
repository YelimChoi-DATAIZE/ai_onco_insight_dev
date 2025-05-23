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

export const GroupVariable = ({ columnDefs = [], alignment, onChange }) => {
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

export function TestSectionVariance({ options = {}, setOptions = () => {} }) {
  const handleCheckboxChange = (key) => (e) => setOptions({ ...options, [key]: e.target.checked });

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography fontWeight="bold" fontFamily="Quicksand" fontSize={13}>
          Variance
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.assumeUnequalVariance ?? false}
                onChange={handleCheckboxChange('assumeUnequalVariance')}
              />
            }
            label="Do not assume equal variance (Welch's)"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.assumeEqualVariance ?? false}
                onChange={handleCheckboxChange('assumeEqualVariance')}
              />
            }
            label="Assume equal variance (Fisher)"
          />
        </FormGroup>
      </CardContent>
    </Card>
  );
}

export function Variance() {
  const [options, setOptions] = useState({
    assumeUnequalVariance: true,
    assumeEqualVariance: false,
  });

  return <TestSectionVariance options={options} setOptions={setOptions} />;
}

export function TestSectionMissing({ options = {}, setOptions = () => {} }) {
  const handleRadioChange = (key) => (e) => setOptions({ ...options, [key]: e.target.value });

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography fontWeight="bold" fontFamily="Quicksand" fontSize={13}>
          Missing Data
        </Typography>
        <RadioGroup
          value={options.missingHandling || 'pairwise'}
          onChange={handleRadioChange('missingHandling')}
          row
        >
          <FormControlLabel
            value="pairwise"
            control={<Radio size="small" />}
            label="Pairwise deletion"
          />
          <FormControlLabel
            value="listwise"
            control={<Radio size="small" />}
            label="Listwise deletion"
          />
        </RadioGroup>
      </CardContent>
    </Card>
  );
}

export function MissingValue() {
  const [options, setOptions] = useState({
    missingHandling: 'pairwise',
  });

  return <TestSectionMissing options={options} setOptions={setOptions} />;
}

export function Assumptionopt({ options = {}, setOptions = () => {} }) {
  const handleCheckboxChange = (key) => (e) => {
    setOptions({ ...options, [key]: e.target.checked });
  };

  const handleInputChange = (key) => (e) => {
    setOptions({ ...options, [key]: e.target.value });
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography fontWeight="bold" fontFamily="Quicksand" fontSize={13}>
          Additional Statistics
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.meanDiff || false}
                onChange={handleCheckboxChange('meanDiff')}
              />
            }
            label="Mean difference"
          />
          <TextField
            label="Confidence Interval"
            size="small"
            type="number"
            variant="standard"
            value={options.meanDiffCI || ''}
            onChange={handleInputChange('meanDiffCI')}
            sx={{ ml: 3 }}
            disabled={!options.meanDiff}
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.effectSize || false}
                onChange={handleCheckboxChange('effectSize')}
              />
            }
            label="Effect size"
          />
          <TextField
            label="Confidence Interval"
            size="small"
            type="number"
            variant="standard"
            value={options.effectSizeCI || ''}
            onChange={handleInputChange('effectSizeCI')}
            sx={{ ml: 3 }}
            disabled={!options.effectSize}
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.statTable || false}
                onChange={handleCheckboxChange('statTable')}
              />
            }
            label={
              <Typography fontSize={13} fontFamily="Quicksand">
                Descriptive statistics table
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.statGraph || false}
                onChange={handleCheckboxChange('statGraph')}
              />
            }
            label="Descriptive plots"
          />
        </FormGroup>
      </CardContent>
    </Card>
  );
}

export function Assumption() {
  const [options, setOptions] = useState({
    meanDiff: false,
    meanDiffCI: 95,
    effectSize: false,
    effectSizeCI: 95,
    statTable: false,
    statGraph: false,
  });

  return <Assumptionopt options={options} setOptions={setOptions} />;
}

export function AssumptionCheckSection({ options = {}, setOptions = () => {} }) {
  const handleCheckboxChange = (key) => (e) => setOptions({ ...options, [key]: e.target.checked });

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography fontWeight="bold" fontFamily="Quicksand" fontSize={13}>
          Assumption Check
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.homogeneityTest || false}
                onChange={handleCheckboxChange('homogeneityTest')}
              />
            }
            label="Homogeneity test"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.normalityTest || false}
                onChange={handleCheckboxChange('normalityTest')}
              />
            }
            label="Normality test"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.qqPlot || false}
                onChange={handleCheckboxChange('qqPlot')}
              />
            }
            label="Q-Q Plot"
          />
        </FormGroup>
      </CardContent>
    </Card>
  );
}

export function AssumptionCheckSection2() {
  const [options, setOptions] = useState({
    homogeneityTest: false,
    normalityTest: false,
    qqPlot: false,
  });

  return <AssumptionCheckSection options={options} setOptions={setOptions} />;
}

export function PostHocSection({ options = {}, setOptions = () => {} }) {
  const handleRadioChange = (e) => setOptions({ ...options, postHocTest: e.target.value });

  const handleCheckboxChange = (key) => (e) => setOptions({ ...options, [key]: e.target.checked });

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography fontWeight="bold" fontFamily="Quicksand" fontSize={13} gutterBottom>
          Post-hoc Test
        </Typography>

        <Grid container spacing={2}>
          {/* Left: Post-hoc Radio Options */}
          <Grid item xs={12} sm={6}>
            <FormLabel component="legend" sx={{ fontSize: 12 }}>
              Post-hoc Comparison
            </FormLabel>
            <RadioGroup value={options.postHocTest ?? 'none'} onChange={handleRadioChange}>
              <FormControlLabel value="none" control={<Radio size="small" />} label="None" />
              <FormControlLabel
                value="gamesHowell"
                control={<Radio size="small" />}
                label="Games-Howell (unequal variances)"
              />
              <FormControlLabel
                value="tukey"
                control={<Radio size="small" />}
                label="Tukey (equal variances)"
              />
            </RadioGroup>
          </Grid>

          {/* Right: Statistics Checkboxes */}
          <Grid item xs={12} sm={6}>
            <FormLabel component="legend" sx={{ fontSize: 12 }}>
              Statistics
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={options.showMeanDiff ?? false}
                    onChange={handleCheckboxChange('showMeanDiff')}
                  />
                }
                label="Mean difference"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={options.showPValue ?? false}
                    onChange={handleCheckboxChange('showPValue')}
                  />
                }
                label="Show p-value"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={options.showTestResult ?? false}
                    onChange={handleCheckboxChange('showTestResult')}
                  />
                }
                label="Show test result"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={options.flagSignificant ?? false}
                    onChange={handleCheckboxChange('flagSignificant')}
                  />
                }
                label="Flag significant comparison"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export function PostHoc() {
  const [options, setOptions] = useState({
    postHocTest: 'none',
    showMeanDiff: true,
    showPValue: true,
    showTestResult: false,
    flagSignificant: false,
  });

  return <PostHocSection options={options} setOptions={setOptions} />;
}

export const RunAnalysis = ({ onRunHistogram }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={onRunHistogram} sx={{ backgroundColor: '#2F72B9', color: '#fff' }}>
        Run Histogram
      </Button>
    </Box>
  );
};
