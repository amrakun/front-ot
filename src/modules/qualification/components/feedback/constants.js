const labels = {
  status: 'Status',
  employmentNumberBefore: 'Employment number before',
  employmentNumberNow: 'Employment number now',
  nationalSpendBefore: 'National spend before engaging with OT',
  nationalSpendAfter: 'National spend after engaging with OT',
  umnugobiSpendBefore: 'Umnugobi spend before engaging with OT',
  umnugobiSpendAfter: 'Umnugobi spend after engaging with OT',
  investment: 'Investment/Capital',
  trainings: 'Trainings',
  corporateSocial:
    'Corporate social responsibility - Contribution to community',
  technologyImprovement: 'Technology improvement/efficency'
};

const titles = {
  changes: {
    title: 'Changes in employment number',
    description:
      'Please insert total employees before engaging with OT and after'
  },
  spend: {
    title: 'Procurement spend in country and Umnugobi aimag',
    description:
      'Please provide your annual spend within the country and in Umnugobi'
  }
};

const template = `
<div>
<p>Dear Supplier,</p>
<p>OT Procurement works with businesses to build a competitive and sustainable
national supply chain and to maintain a productive and positive relationship
with suppliers to support the creation of empowered and sustainable local community.</p>
<p>We would want to hear about your successes, stories, achievements and contributions
to a community which will inspire and support other communities as well.
</p><p>Please share your stories in below field and submit to us!<br />
Together we can endure value, knowledge and skills!</p><p>
Stay safe,</p><p>OP Procurement Department.</p>
</div>
`;

export { labels, titles, template };
