import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  FormLabel,
  Select,
  MenuItem,
  Box,
  RadioGroup,
  Radio,
  Button,
} from '@mui/material';

export function ValidationSection({ options = {}, setOptions = () => {} }) {
  const handleCheckboxChange = (key) => (e) => {
    setOptions({ ...options, [key]: e.target.checked });
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography fontWeight="bold" fontSize={13} fontFamily="Quicksand">
          Test
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.chiSquare ?? false}
                onChange={handleCheckboxChange('chiSquare')}
              />
            }
            label="Chi-square (χ²)"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.chiSquareContinuity ?? false}
                onChange={handleCheckboxChange('chiSquareContinuity')}
              />
            }
            label="Chi-square continuity correction"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.likelihoodRatio ?? false}
                onChange={handleCheckboxChange('likelihoodRatio')}
              />
            }
            label="Likelihood ratio"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.fishersExact ?? false}
                onChange={handleCheckboxChange('fishersExact')}
              />
            }
            label="Fisher’s exact test"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.zTestProportions ?? false}
                onChange={handleCheckboxChange('zTestProportions')}
              />
            }
            label="z-test for difference in 2 proportions"
          />
        </FormGroup>
      </CardContent>
    </Card>
  );
}

export function ComparisonSection({ options = {}, setOptions = () => {} }) {
  const handleCheckboxChange = (key) => (e) => {
    setOptions({ ...options, [key]: e.target.checked });
  };

  const handleInputChange = (key) => (e) => {
    setOptions({ ...options, [key]: e.target.value });
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography fontWeight="bold" fontSize={13} fontFamily="Quicksand">
          Comparative Measures (2x2 only)
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.oddsRatio ?? false}
                onChange={handleCheckboxChange('oddsRatio')}
              />
            }
            label="Odds Ratio"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.logOddsRatio ?? false}
                onChange={handleCheckboxChange('logOddsRatio')}
              />
            }
            label="Log Odds Ratio"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.relativeRisk ?? false}
                onChange={handleCheckboxChange('relativeRisk')}
              />
            }
            label="Relative Risk"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.riskDifference ?? false}
                onChange={handleCheckboxChange('riskDifference')}
              />
            }
            label="Risk Difference"
          />

          {/* Confidence Interval */}
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.ci ?? false}
                onChange={handleCheckboxChange('ci')}
              />
            }
            label="Confidence Interval"
          />
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 3, mt: -1 }}>
            <TextField
              size="small"
              type="number"
              variant="standard"
              label="Level"
              value={options.ciLevel ?? 95}
              onChange={handleInputChange('ciLevel')}
              sx={{ width: 60, mr: 1 }}
              disabled={!options.ci}
            />
            <Typography variant="body2">%</Typography>
          </Box>

          {/* Compare By Option */}
          <Box sx={{ mt: 2 }}>
            <FormLabel component="legend" sx={{ fontSize: 12 }}>
              Compare by
            </FormLabel>
            <Select
              size="small"
              value={options.compareBy ?? 'row'}
              onChange={handleInputChange('compareBy')}
              sx={{ mt: 0.5, width: 120 }}
            >
              <MenuItem value="row">Row</MenuItem>
              <MenuItem value="column">Column</MenuItem>
            </Select>
          </Box>
        </FormGroup>
      </CardContent>
    </Card>
  );
}

export function OrdinalScaleSection({ options = {}, setOptions = () => {} }) {
  const handleCheckboxChange = (key) => (e) => {
    setOptions({ ...options, [key]: e.target.checked });
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography fontWeight="bold" fontSize={13} fontFamily="Quicksand">
          Ordinal Scale
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.gamma ?? false}
                onChange={handleCheckboxChange('gamma')}
              />
            }
            label="Gamma"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.kendallTauB ?? false}
                onChange={handleCheckboxChange('kendallTauB')}
              />
            }
            label="Kendall's Tau-b"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.mantelHaenszel ?? false}
                onChange={handleCheckboxChange('mantelHaenszel')}
              />
            }
            label="Mantel-Haenszel"
          />
        </FormGroup>
      </CardContent>
    </Card>
  );
}

export function NominalScaleSection({ options = {}, setOptions = () => {} }) {
  const handleCheckboxChange = (key) => (e) => {
    setOptions({ ...options, [key]: e.target.checked });
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography fontWeight="bold" fontSize={13} fontFamily="Quicksand">
          Nominal Scale
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.contingencyCoeff ?? false}
                onChange={handleCheckboxChange('contingencyCoeff')}
              />
            }
            label="Contingency Coefficient"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.phiCramerV ?? false}
                onChange={handleCheckboxChange('phiCramerV')}
              />
            }
            label="Phi and Cramér’s V"
          />
        </FormGroup>
      </CardContent>
    </Card>
  );
}

export function HypothesisSection({ options = {}, setOptions = () => {} }) {
  const handleRadioChange = (e) => {
    setOptions({ ...options, hypothesisType: e.target.value });
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography fontWeight="bold" fontFamily="Quicksand" fontSize={13}>
          Hypothesis
        </Typography>
        <FormLabel component="legend" sx={{ fontSize: 12 }}>
          Alternative Hypothesis
        </FormLabel>
        <RadioGroup value={options.hypothesisType ?? 'notEqual'} onChange={handleRadioChange}>
          <FormControlLabel
            value="notEqual"
            control={<Radio size="small" />}
            label="Group 1 ≠ Group 2"
          />
          <FormControlLabel
            value="greater"
            control={<Radio size="small" />}
            label="Group 1 > Group 2"
          />
          <FormControlLabel
            value="less"
            control={<Radio size="small" />}
            label="Group 1 < Group 2"
          />
        </RadioGroup>
      </CardContent>
    </Card>
  );
}

export function Validation() {
  const [options, setOptions] = useState({
    chiSquare: true,
    chiSquareContinuity: false,
    likelihoodRatio: false,
    fishersExact: false,
    zTestProportions: false,
  });

  return <ValidationSection options={options} setOptions={setOptions} />;
}

export function Hypothesis() {
  const [options, setOptions] = useState({
    hypothesisType: 'notEqual', // 'notEqual' | 'greater' | 'less'
  });

  return <HypothesisSection options={options} setOptions={setOptions} />;
}

export function Comparison() {
  const [options, setOptions] = useState({
    oddsRatio: false,
    logOddsRatio: false,
    relativeRisk: false,
    riskDifference: false,
    ci: true,
    ciLevel: 95,
    compareBy: 'row', // or 'column'
  });

  return <ComparisonSection options={options} setOptions={setOptions} />;
}

export function NominalScale() {
  const [options, setOptions] = useState({
    contingencyCoeff: false,
    phiCramerV: false,
  });

  return <NominalScaleSection options={options} setOptions={setOptions} />;
}

export function OrdinalScale() {
  const [options, setOptions] = useState({
    gamma: false,
    kendallTauB: false,
    mantelHaenszel: false,
  });

  return <OrdinalScaleSection options={options} setOptions={setOptions} />;
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

// export const frequency_node = {
//   SelectVariable,
//   Validation,
//   Comparison,
//   Hypothesis,
//   NominalScale,
//   OrdinalScale,
//   Run,
// };
