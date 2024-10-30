"use client"

import { z } from 'zod';
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';

const UserSchema = z.object({
  nid: z.string().optional(),
  surname: z.string().optional(),
  o_name: z.string().optional(),
  alias: z.string().optional(),
  address: z.string().optional(),
  dl: z.string().optional(),
  constituency: z.string().optional(),
  voter_id: z.string().optional(),
});

type UserFiltersFormData = z.infer<typeof UserSchema>;

export const UserFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<UserFiltersFormData>({
    resolver: zodResolver(UserSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filters, setFilters] = useState<{
  nid?: string;
  surname?: string;
  o_name?: string;
  alias?: string;
  address?: string;
  dl?: string;
  constituency?: string;
  voter_id?: string;
  limit?: string;
  }>({
    // Initialize filters from the current search params
    ...Object.fromEntries(searchParams.entries())
  });

  const onSubmit = (data: UserFiltersFormData) => {
    const newSearchParams = new URLSearchParams();
    Object.keys(data).forEach((key) => {
      if (data[key as keyof UserFiltersFormData] && String(data[key as keyof UserFiltersFormData]).trim()) {
        newSearchParams.set(key, String(data[key as keyof UserFiltersFormData]));
      }
    });
    router.push(`${window.location.pathname}?${newSearchParams.toString()}`);
  };

  const setLimit = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('limit', value);
    router.push(`${window.location.pathname}?${newSearchParams.toString()}`);
  };

  const clearFilters = () => {
    reset();
    router.push(window.location.pathname);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {Object.keys(UserSchema.shape).map((key) => (
          key === 'constituency' ? (
            <ConstituencyDropdown key={key} />
          ) : (
            <Input
              key={key}
              placeholder={`Filter ${key}`}
              {...register(key as keyof UserFiltersFormData)}
            />
          )
        ))}
      </div>
      <div className="flex justify-end space-x-2 mb-4">
        <Select
          value={filters.limit || '20'}
          onValueChange={(value) => setLimit(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select limit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="20">20 per page</SelectItem>
            <SelectItem value="50">50 per page</SelectItem>
            <SelectItem value="100">100 per page</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" variant="default">
          Apply Filters
        </Button>
        <Button variant="outline" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </form>
  );
};

const CONSTITUENCIES = ["AA",
  "AAB",
  "AAC",
  "AB",
  "AC",
  "ACA",
  "AD",
  "AE",
  "AF",
  "AG",
  "AH",
  "AJ",
  "AK",
  "AL",
  "BA",
  "BC",
  "BD",
  "BE",
  "BF",
  "BH",
  "BJ",
  "BK",
  "BL",
  "CA",
  "CB",
  "CC",
  "CD",
  "CE",
  "CF",
  "CG",
  "CH",
  "CJ",
  "CK",
  "CL",
  "CM",
  "DA",
  "DB",
  "DC",
  "DE",
  "DF",
  "DG",
  "DGA",
  "DH",
  "DJ",
  "DK",
  "DL",
  "DM",
  "DMA",
  "EA",
  "EB",
  "EBA",
  "EBC",
  "EC",
  "ECA",
  "ED",
  "EDA",
  "EDB",
  "EF",
  "EG",
  "EGA",
  "EH",
  "EJ",
  "EK",
  "EKA",
  "EKB",
  "EL",
  "FA",
  "FB",
  "FC",
  "FCA",
  "FCB",
  "FCC",
  "FCD",
  "FD",
  "FDA",
  "FE",
  "FG",
  "FGA",
  "FGB",
  "FH",
  "FHA",
  "FJ",
  "FK",
  "GA",
  "GAB",
  "GB",
  "GC",
  "GD",
  "GE",
  "GEA",
  "GF",
  "GH",
  "GK",
  "GL",
  "GM",
  "GN",
  "GNA",
  "GP",
  "GR",
  "GRA",
  "HA",
  "HAB",
  "HAC",
  "HAD",
  "HB",
  "HBA",
  "HBC",
  "HC",
  "HD",
  "HE",
  "HEA",
  "HF",
  "HFA",
  "HG",
  "HJ",
  "HJA",
  "HK",
  "HL",
  "HM",
  "HN",
  "JA",
  "JAB",
  "JB",
  "JC",
  "JD",
  "JE",
  "JEA",
  "JEB",
  "JF",
  "JFA",
  "JH",
  "JHA",
  "JK",
  "JKA",
  "JL",
  "JM",
  "JMA",
  "JN",
  "JNA",
  "KA",
  "KAB",
  "KB",
  "KC",
  "KD",
  "KE",
  "KEA",
  "KF",
  "KG",
  "KH",
  "KJ",
  "KJA",
  "KJB",
  "KJC",
  "KL",
  "KM",
  "KMA",
  "KN",
  "LA",
  "LB",
  "LC",
  "LD",
  "LE",
  "LF",
  "LG",
  "LGA",
  "LJ",
  "LK",
  "LM",
  "LMA",
  "LMB",
  "LMC",
  "LP",
  "LPA",
  "LPB",
  "LR",
  "LRA",
  "LS",
  "LSA",
  "MA",
  "MB",
  "MC",
  "MCA",
  "MCB",
  "MCD",
  "MD",
  "ME",
  "MEA",
  "MF",
  "MFA",
  "MG",
  "MH",
  "NA",
  "NB",
  "NC",
  "NCA",
  "ND",
  "NE",
  "NEA",
  "NF",
  "NG",
  "NH",
  "NJ",
  "NK",
  "NKA",
  "PA",
  "PAB",
  "PB",
  "PE",
  "PEA",
  "PEB",
  "PF",
  "PG",
  "PH",
  "PJ",
  "PL",
  "PM",
  "PN",
  "PR",
  "PS",
  "PV",
  "PW",
  "PWA",
  "PWB",
  "PX",
  "PY",
  "PZ",
  "RA",
  "RAA",
  "RB",
  "RC",
  "RCA",
  "RD",
  "RE",
  "REA",
  "REB",
  "RF",
  "RG",
  "RH",
  "RJ",
  "RJA",
  "RJB",
  "RK",
  "RL",
  "RM",
  "RN",
  "RP",
  "RS",
  "SA",
  "SB",
  "SC",
  "SCA",
  "SCB",
  "SD",
  "SE",
  "SF",
  "SG",
  "SH",
  "SJ",
  "SK",
  "SL",
  "SLA",
  "SM",
  "SN",
  "TA",
  "TB",
  "TC",
  "TD",
  "TE",
  "TF",
  "TG",
  "TGA",
  "TH",
  "TJ",
  "TJA",
  "TK",
  "TL",
  "TLA",
  "VA",
  "VB",
  "VC",
  "VE",
  "VF",
  "VG",
  "VH",
  "VJ",
  "VK",
  "VL",
  "VM",
  "VN",
  "VP",
  "XA",
  "XAA",
  "XB",
  "XC",
  "XD",
  "XE",
  "XF",
  "XG",
  "XH",
  "XJ",
  "XK",
  "YA",
  "YB",
  "YC",
  "YD",
  "YE",
  "YF",
  "YG",
  "YH",
  "YHA",
  "YJ",
  "YK",
  "YL",
  "YLA",
  "ZA",
  "ZAA",
  "ZB",
  "ZBA",
  "ZBB",
  "ZC",
  "ZCA",
  "ZCB",
  "ZD",
  "ZDA",
  "ZDB",
  "ZE",
  "ZEA",
  "ZEB",
  "ZF",
  "ZFA",
  "ZFB",
  "ZFC"]

const ConstituencyDropdown = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all') {
      params.delete('constituency')
    } else {
      params.set('constituency', value)
    }
    params.delete('page') // Reset pagination when filter changes
    router.push(`${pathname}?${params.toString()}`)
  }

  const currentValue = searchParams.get('constituency') || ''

  return (
    <Select onValueChange={handleSelect} value={currentValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select constituency" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All constituencies</SelectItem>
        {CONSTITUENCIES.map((constituency) => (
          <SelectItem key={constituency} value={constituency}>
            {constituency}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )


}