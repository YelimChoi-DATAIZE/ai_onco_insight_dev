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

export function TestSectionHypothesis({ options = {}, setOptions = () => {} }) {
  const handleInputChange = (key) => (e) => setOptions({ ...options, [key]: e.target.value });

  const handleRadioChange = (key) => (e) => setOptions({ ...options, [key]: e.target.value });

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography fontWeight="bold" fontFamily="Quicksand" fontSize={13}>
          Hypothesis
        </Typography>
        <TextField
          label="Test value"
          size="small"
          type="number"
          variant="standard"
          value={options.hypothesisValue ?? ''}
          onChange={handleInputChange('hypothesisValue')}
          fullWidth
          sx={{ mb: 1 }}
        />
        <FormLabel component="legend" sx={{ fontSize: 12 }}>
          Condition
        </FormLabel>
        <RadioGroup
          value={options.hypothesisCondition ?? ''}
          onChange={handleRadioChange('hypothesisCondition')}
        >
          <FormControlLabel value="!=" control={<Radio size="small" />} label="≠ Test value" />
          <FormControlLabel value=">" control={<Radio size="small" />} label="> Test value" />
          <FormControlLabel value="<" control={<Radio size="small" />} label="< Test value" />
        </RadioGroup>
      </CardContent>
    </Card>
  );
}

export function Hypothesis() {
  const [options, setOptions] = useState({
    hypothesisValue: 0,
    hypothesisCondition: '!=',
  });

  return <TestSectionHypothesis options={options} setOptions={setOptions} />;
}

export function VarianceSection({ options = {}, setOptions = () => {} }) {
  const handleExclusiveChange = (key) => (e) => {
    const checked = e.target.checked;
    setOptions({
      assumeWelch: key === 'assumeWelch' ? checked : false,
      assumeFisher: key === 'assumeFisher' ? checked : false,
    });
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography fontWeight="bold" fontFamily="Quicksand" fontSize={13}>
          분산
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.assumeWelch ?? false}
                onChange={handleExclusiveChange('assumeWelch')}
              />
            }
            label="동분산을 가정하지 않음 (Welch's)"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.assumeFisher ?? false}
                onChange={handleExclusiveChange('assumeFisher')}
              />
            }
            label="동분산 가정 (Fisher)"
          />
        </FormGroup>
      </CardContent>
    </Card>
  );
}

export function Variance() {
  const [options, setOptions] = useState({
    assumeWelch: true,
    assumeFisher: false,
  });

  return <VarianceSection options={options} setOptions={setOptions} />;
}

export function AdditionalStatisticSection({ options = {}, setOptions = () => {} }) {
  const handleCheckboxChange = (key) => (e) => {
    setOptions({ ...options, [key]: e.target.checked });
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
                checked={options.statTable || false}
                onChange={handleCheckboxChange('statTable')}
              />
            }
            label="Descriptive statistics table"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.statGraph || false}
                onChange={handleCheckboxChange('statGraph')}
              />
            }
            label="Descriptive statistics plot"
          />
        </FormGroup>
      </CardContent>
    </Card>
  );
}

export function AdditionalStatistic() {
  const [options, setOptions] = useState({
    statTable: false,
    statGraph: false,
  });

  return <AdditionalStatisticSection options={options} setOptions={setOptions} />;
}

export function MissingSection({ options = {}, setOptions = () => {} }) {
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

export function Missing() {
  const [options, setOptions] = useState({
    missingHandling: 'pairwise',
  });

  return <MissingSection options={options} setOptions={setOptions} />;
}

export function AssumptionSection({ options = {}, setOptions = () => {} }) {
  const handleCheckboxChange = (key) => (e) => {
    setOptions({ ...options, [key]: e.target.checked });
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography fontWeight="bold" fontSize={13} fontFamily="Quicksand">
          가정검증
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.homogeneityTest ?? false}
                onChange={handleCheckboxChange('homogeneityTest')}
              />
            }
            label="동질성 검증"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.normalityTest ?? false}
                onChange={handleCheckboxChange('normalityTest')}
              />
            }
            label="정규분포성 검증"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.qqPlot ?? false}
                onChange={handleCheckboxChange('qqPlot')}
              />
            }
            label="Q-Q 도표"
          />
        </FormGroup>
      </CardContent>
    </Card>
  );
}

export function Assumption() {
  const [options, setOptions] = useState({
    homogeneityTest: false,
    normalityTest: false,
    qqPlot: false,
  });

  return <AssumptionSection options={options} setOptions={setOptions} />;
}

export function PostHocStatisticsSection({ options = {}, setOptions = () => {} }) {
  const handleRadioChange = (e) => {
    setOptions({ ...options, postHoc: e.target.value });
  };

  const handleCheckboxChange = (key) => (e) => {
    setOptions({ ...options, [key]: e.target.checked });
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography fontWeight="bold" fontFamily="Quicksand" fontSize={13} gutterBottom>
          Post-hoc Test
        </Typography>

        <Grid container spacing={2}>
          {/* Post-hoc Test Options */}
          <Grid item xs={12} sm={6}>
            <FormLabel component="legend" sx={{ fontSize: 12 }}>
              Post-hoc Options
            </FormLabel>
            <RadioGroup value={options.postHoc ?? 'none'} onChange={handleRadioChange}>
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

          {/* Statistics Options */}
          <Grid item xs={12} sm={6}>
            <FormLabel component="legend" sx={{ fontSize: 12 }}>
              Statistics
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={options.meanDiff ?? false}
                    onChange={handleCheckboxChange('meanDiff')}
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
                    checked={options.flagImportant ?? false}
                    onChange={handleCheckboxChange('flagImportant')}
                  />
                }
                label="Flag important comparisons"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export function PostHocStatistics() {
  const [options, setOptions] = useState({
    postHoc: 'none', // 'none' | 'gamesHowell' | 'tukey'
    meanDiff: true,
    showPValue: true,
    showTestResult: false,
    flagImportant: false,
  });

  return <PostHocStatisticsSection options={options} setOptions={setOptions} />;
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

// export const anova_node = {
//   GroupVariable,
//   Variance,(ㅇ)
//   AdditionalStatistic,(ㅇ)
//   Missing,(ㅇ)
//   Assumption,(ㅇ)
//   PostHocStatistics,(ㅇ)
//   Run,(ㅇ)
// };
